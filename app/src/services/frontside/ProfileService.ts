import { shallowEqual } from "react-redux";

import { ResponseErrorEnum } from "@enums/ResponseErrorEnum";
import { AxiosResponseError } from "@interfaces/ResponseErrorInterface";
import { ImageInterface } from "@interfaces/frontside/ImageInterface";
import { ProfileInterface, ProfileParams, ProfileSliceInterface } from "@interfaces/frontside/ProfileInterface";
import ProfileApi from "@repositories/frontside/ProfileApi";
import AuthService from "@services/frontside/AuthService";
import store, { useAppSelector } from "@store/Store";
import { update } from "@store/slices/frontside/ProfileSlice";
import { navigateTo } from "@utils/Helpers";

class ProfileService {
  public clearState() {
    store.dispatch(update({ data: [], is_loading: false, error: "" }));
  }

  public getState(): ProfileSliceInterface {
    return useAppSelector((state) => state.frontside.profile, shallowEqual);
  }

  public getter<T>(key: string): T {
    return useAppSelector((state) => {
      if (state.frontside.profile.data == null) {
        return null;
      }
      return state.frontside.profile.data[key];
    }) as T;
  }

  public getProfileId(): number | null {
    return useAppSelector((state) => state.frontside.profile.data?.id ?? null, shallowEqual);
  }

  public getProfile(): ProfileInterface | null {
    return useAppSelector((state) => state.frontside.profile.data, shallowEqual);
  }

  public getProfileFullName(): string | null {
    return useAppSelector((state) => {
      if (state.frontside.profile.data == null) {
        return null;
      }
      const { first_name, last_name } = state.frontside.profile.data;
      return `${first_name} ${last_name}`;
    }, shallowEqual);
  }

  public getProfileNickNmae(): string | null {
    return useAppSelector((state) => state.frontside.profile.data?.nick_name ?? null, shallowEqual);
  }

  public getProfileEmail(): string | null {
    return useAppSelector((state) => state.frontside.profile.data?.email ?? null, shallowEqual);
  }

  public getProfileImages(): ImageInterface[] {
    return useAppSelector((state) => state.frontside.profile.data?.profile_images ?? [], shallowEqual);
  }

  public getIsLoading(): boolean {
    return useAppSelector((state) => state.frontside.profile.is_loading, shallowEqual);
  }

  public getError(): string {
    return useAppSelector((state) => state.frontside.profile.error, shallowEqual);
  }

  public update(params: any): void {
    store.dispatch(update(params));
  }

  public loadProfile(profileId: number): void {
    store.dispatch(update({ is_loading: true }));

    const params: ProfileParams = {
      id: profileId,
    };

    ProfileApi.getProfile(params)
      .then((response) => {
        store.dispatch(update({ data: response, is_loading: false }));
        return response;
      })
      .catch((e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.loadProfile(profileId);
            });
            break;
          default:
            store.dispatch(update({ is_loading: false, error: e.data }));
            navigateTo(`/something-went-wrong?data=${JSON.stringify(e.data)}`);
            throw e;
        }
      });
  }
}

export default new ProfileService();
