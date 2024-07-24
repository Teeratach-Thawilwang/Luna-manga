import { shallowEqual } from "react-redux";

import { ResponseErrorEnum } from "@enums/ResponseErrorEnum";
import { AxiosResponseError } from "@interfaces/ResponseErrorInterface";
import { PermissionListInterface, PermissionListSliceInterface } from "@interfaces/backoffice/PermissionInterface";
import PermissionApi from "@repositories/backoffice/PermissionApi";
import AuthService from "@services/backoffice/AuthService";
import store, { useAppSelector } from "@store/Store";
import { update } from "@store/slices/backoffice/PermissionListSlice";

class PermissionListService {
  public clearState() {
    store.dispatch(update({ data: [], is_loading: false, error: "" }));
  }

  public getState(): PermissionListSliceInterface {
    return useAppSelector((state) => state.backoffice.permissionList, shallowEqual);
  }

  public getData(): PermissionListInterface[] {
    return useAppSelector((state) => state.backoffice.permissionList.data, shallowEqual);
  }

  public getIsLoaded(): boolean {
    return useAppSelector((state) => state.backoffice.permissionList.data.length != 0, shallowEqual);
  }

  public getIsLoading(): boolean {
    return useAppSelector((state) => state.backoffice.permissionList.is_loading, shallowEqual);
  }

  public getError(): string {
    return useAppSelector((state) => state.backoffice.permissionList.error, shallowEqual);
  }

  public update(params: any): void {
    store.dispatch(update(params));
  }

  public loadPermissionList(): void {
    store.dispatch(update({ is_loading: true }));

    PermissionApi.index({})
      .then((response) => {
        const { data } = response;
        store.dispatch(update({ data: data, is_loading: false }));
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.loadPermissionList();
            });
            break;
          default:
            store.dispatch(update({ is_loading: false, error: JSON.stringify(e.data) }));
            throw e;
        }
      });
  }
}

export default new PermissionListService();
