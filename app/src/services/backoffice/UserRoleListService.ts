import { shallowEqual } from "react-redux";

import { ResponseErrorEnum } from "@enums/ResponseErrorEnum";
import { AxiosResponseError } from "@interfaces/ResponseErrorInterface";
import { PaginationInterface } from "@interfaces/backoffice/PaginationInterface";
import { GetUserRoleListParams, UserRoleListInterface, UserRoleListSliceInterface } from "@interfaces/backoffice/UserRoleInterface";
import UserRoleApi from "@repositories/backoffice/UserRoleApi";
import AuthService from "@services/backoffice/AuthService";
import store, { useAppSelector } from "@store/Store";
import { update } from "@store/slices/backoffice/UserRoleListSlice";

class UserRoleListService {
  public clearState() {
    store.dispatch(update({ data: [], paginate: null, filter: null, is_loading: false, error: "" }));
  }

  public getState(): UserRoleListSliceInterface {
    return useAppSelector((state) => state.backoffice.userRoleList, shallowEqual);
  }

  public getData(): UserRoleListInterface[] {
    return useAppSelector((state) => state.backoffice.userRoleList.data, shallowEqual);
  }

  public getIsLoaded(): boolean {
    return useAppSelector((state) => state.backoffice.userRoleList.paginate != null, shallowEqual);
  }

  public getPaginate(): PaginationInterface | null {
    return useAppSelector((state) => state.backoffice.userRoleList.paginate, shallowEqual);
  }

  public getIsLoading(): boolean {
    return useAppSelector((state) => state.backoffice.userRoleList.is_loading, shallowEqual);
  }

  public getError(): string {
    return useAppSelector((state) => state.backoffice.userRoleList.error, shallowEqual);
  }

  public update(params: any): void {
    store.dispatch(update(params));
  }

  public loadUserRoleList(page: number = 1, perPage: number = 16, orderBy: string = "-id"): void {
    const params: GetUserRoleListParams = {
      page: page,
      per_page: perPage,
      order_by: orderBy,
    };

    store.dispatch(update({ is_loading: true, filter: params }));

    UserRoleApi.index(params)
      .then((response) => {
        const { data, ...paginate } = response;
        store.dispatch(update({ data: data, paginate: paginate, is_loading: false }));
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.loadUserRoleList(page, perPage, orderBy);
            });
            break;
          default:
            store.dispatch(update({ is_loading: false, error: JSON.stringify(e.data) }));
            throw e;
        }
      });
  }
}

export default new UserRoleListService();
