import { shallowEqual } from "react-redux";

import { ResponseErrorEnum } from "@enums/ResponseErrorEnum";
import { UserStatusEnum } from "@enums/backoffice/StatusEnum";
import { AxiosResponseError } from "@interfaces/ResponseErrorInterface";
import { PermissionListInterface } from "@interfaces/backoffice/PermissionInterface";
import { UserInterface } from "@interfaces/backoffice/UserInterface";
import { UpdateUserProfileParams, UserProfileSliceInterface } from "@interfaces/backoffice/UserProfileInterface";
import UserProfileApi from "@repositories/backoffice/UserProfileApi";
import AuthService from "@services/backoffice/AuthService";
import store, { useAppSelector } from "@store/Store";
import { update } from "@store/slices/backoffice/UserProfileSlice";
import { navigateToLoginBackoffice, reloadPage } from "@utils/Helpers";

class UserProfileService {
  public clearState() {
    store.dispatch(update({ data: [], is_loading: false, error: "" }));
  }

  public getState(): UserProfileSliceInterface {
    return useAppSelector((state) => state.backoffice.userProfile, shallowEqual);
  }

  public isLoggedIn(): boolean {
    return useAppSelector((state) => (state.backoffice.userProfile.data == null ? false : true), shallowEqual);
  }

  public getCustomerId(): number | null {
    return useAppSelector((state) => state.backoffice.userProfile.data?.id ?? null, shallowEqual);
  }

  public getProfile(): UserInterface | null {
    return useAppSelector((state) => state.backoffice.userProfile.data, shallowEqual);
  }

  public getPermissions(): PermissionListInterface[] | null {
    return useAppSelector((state) => state.backoffice.userProfile.data?.permissions ?? null, shallowEqual);
  }

  public getter<T>(key: string): T | null {
    return useAppSelector((state) => {
      if (state.backoffice.userProfile.data == null) {
        return null;
      }
      return state.backoffice.userProfile.data[key] as T;
    });
  }

  public getIsLoading(): boolean {
    return useAppSelector((state) => state.backoffice.userProfile.is_loading, shallowEqual);
  }

  public getError(): string {
    return useAppSelector((state) => state.backoffice.userProfile.error, shallowEqual);
  }

  public update(params: any): void {
    store.dispatch(update(params));
  }

  public async loadProfile(): Promise<boolean> {
    store.dispatch(update({ is_loading: true }));

    return UserProfileApi.show({})
      .then((response) => {
        store.dispatch(update({ data: response, is_loading: false }));
        return true;
      })
      .catch((e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.loadProfile();
            });
            return true;
          default:
            store.dispatch(update({ is_loading: false, error: e.data }));
            navigateToLoginBackoffice();
            throw e;
        }
      });
  }

  public updateProfile(
    id: number,
    email: string,
    password: string,
    nickName: string,
    firstName: string,
    lastName: string,
    status: UserStatusEnum,
  ): void {
    const params: UpdateUserProfileParams = {
      id: id,
      email: email,
      password: password,
      nick_name: nickName,
      first_name: firstName,
      last_name: lastName,
      status: status,
    };

    UserProfileApi.update(params)
      .then((_response) => {
        reloadPage();
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.updateProfile(id, email, password, nickName, firstName, lastName, status);
            });
            break;
          default:
            throw e;
        }
      });
  }
}

export default new UserProfileService();
