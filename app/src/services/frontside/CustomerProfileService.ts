import { shallowEqual } from "react-redux";
import { toast } from "react-toastify";

import { ResponseErrorEnum } from "@enums/ResponseErrorEnum";
import { AxiosResponseError } from "@interfaces/ResponseErrorInterface";
import { CustomerProfileInterface, CustomerProfileSliceInterface, UpdateCustomerProfileParams } from "@interfaces/frontside/CustomerProfileInterface";
import CustomerProfileApi from "@repositories/frontside/CustomerProfileApi";
import AuthService from "@services/frontside/AuthService";
import store, { useAppSelector } from "@store/Store";
import { update } from "@store/slices/frontside/CustomerProfileSlice";
import { navigateTo } from "@utils/Helpers";

class CustomerProfileService {
  public clearState() {
    store.dispatch(update({ data: [], is_loading: false, error: "" }));
  }

  public getState(): CustomerProfileSliceInterface {
    return useAppSelector((state) => state.frontside.customerProfile, shallowEqual);
  }

  public isLoggedIn(): boolean {
    return useAppSelector((state) => (state.frontside.customerProfile.data == null ? false : true), shallowEqual);
  }

  public getCustomerId(): number | null {
    return useAppSelector((state) => state.frontside.customerProfile.data?.id ?? null, shallowEqual);
  }

  public getProfile(): CustomerProfileInterface | null {
    return useAppSelector((state) => state.frontside.customerProfile.data, shallowEqual);
  }

  public getter<T>(key: string): T | null {
    return useAppSelector((state) => {
      if (state.frontside.customerProfile.data == null) {
        return null;
      }
      return state.frontside.customerProfile.data[key] as T;
    }, shallowEqual);
  }

  public getIsLoading(): boolean {
    return useAppSelector((state) => state.frontside.customerProfile.is_loading, shallowEqual);
  }

  public getError(): string {
    return useAppSelector((state) => state.frontside.customerProfile.error, shallowEqual);
  }

  public update(params: any): void {
    store.dispatch(update(params));
  }

  public async loadProfile(): Promise<boolean> {
    store.dispatch(update({ is_loading: true }));

    return CustomerProfileApi.getProfile({})
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
          case ResponseErrorEnum.RESOURCE_NOT_FOUND:
            throw e;
          default:
            store.dispatch(update({ is_loading: false, error: e.data }));
            navigateTo(`/something-went-wrong?data=${JSON.stringify(e.data)}`);
            throw e;
        }
      });
  }

  public updateProfile(customerId: number, fitstName: string, lastName: string, nickName: string, email: string, profileImageId?: number): void {
    const params: UpdateCustomerProfileParams = {
      first_name: fitstName,
      last_name: lastName,
      nick_name: nickName,
    };

    if (profileImageId != undefined) {
      params["profile_image_id"] = profileImageId;
    }

    CustomerProfileApi.updateProfile(params)
      .then((response) => {
        store.dispatch(update({ data: response, is_loading: false }));
        toast.success("แก้ไขข้อมูลสำเร็จ");
        navigateTo(`/profile/${customerId}`);
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.updateProfile(customerId, fitstName, lastName, nickName, email, profileImageId);
            });
            break;
          default:
            toast.success(String(e.data.message));
            throw e;
        }
      });
  }
}

export default new CustomerProfileService();
