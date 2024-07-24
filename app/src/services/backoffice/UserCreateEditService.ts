import { shallowEqual } from "react-redux";
import { toast } from "react-toastify";

import { ResponseErrorEnum } from "@enums/ResponseErrorEnum";
import { GroupSettingUrlEnum } from "@enums/backoffice/GroupSettingEnum";
import { UserStatusEnum } from "@enums/backoffice/StatusEnum";
import { AxiosResponseError } from "@interfaces/ResponseErrorInterface";
import { CreateUserParams, UpdateUserParams, UserCreateEditSliceInterface } from "@interfaces/backoffice/UserInterface";
import UserApi from "@repositories/backoffice/UserApi";
import AuthService from "@services/backoffice/AuthService";
import store, { useAppSelector } from "@store/Store";
import { update } from "@store/slices/backoffice/UserCreateEditSlice";
import { navigateTo } from "@utils/Helpers";

class UserCreateEditService {
  public clearState() {
    store.dispatch(
      update({
        email: null,
        password: null,
        nick_name: null,
        first_name: null,
        last_name: null,
        status: null,
        email_error_message: "",
        password_error_message: "",
        nick_name_error_message: "",
        first_name_error_message: "",
        last_name_error_message: "",
      }),
    );
  }

  public getter<T>(key: string): T {
    return useAppSelector((state) => state.backoffice.userCreateEdit[key], shallowEqual) as T;
  }

  public getState(): UserCreateEditSliceInterface {
    return useAppSelector((state) => state.backoffice.userCreateEdit, shallowEqual);
  }

  public update(params: any): void {
    store.dispatch(update(params));
  }

  public createUser(email: string, password: string, nickName: string, firstName: string, lastName: string, status: UserStatusEnum): void {
    const params: CreateUserParams = {
      email: email,
      password: password,
      nick_name: nickName,
      first_name: firstName,
      last_name: lastName,
      status: status,
    };

    UserApi.create(params)
      .then((_response) => {
        toast.success("Create Sucessfully.");
        navigateTo(GroupSettingUrlEnum.USER_LIST);
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.createUser(email, password, nickName, firstName, lastName, status);
            });
            break;
          default:
            toast.error(String(e.data.error));
            throw e;
        }
      });
  }

  public updateUser(
    id: number,
    email: string,
    password: string | undefined,
    nickName: string,
    firstName: string,
    lastName: string,
    status: UserStatusEnum,
  ): void {
    const params: UpdateUserParams = {
      id: id,
      email: email,
      nick_name: nickName,
      first_name: firstName,
      last_name: lastName,
      status: status,
    };

    if (password != undefined) {
      params["password"] = password;
    }

    UserApi.update(params)
      .then((_response) => {
        toast.success("Update Sucessfully.");
        navigateTo(GroupSettingUrlEnum.USER_LIST);
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.updateUser(id, email, password, nickName, firstName, lastName, status);
            });
            break;
          default:
            toast.error(String(e.data.error));
            throw e;
        }
      });
  }
}

export default new UserCreateEditService();
