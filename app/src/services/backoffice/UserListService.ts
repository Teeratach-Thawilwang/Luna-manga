import { shallowEqual } from "react-redux";

import { ResponseErrorEnum } from "@enums/ResponseErrorEnum";
import { UserStatusEnum } from "@enums/backoffice/StatusEnum";
import { AxiosResponseError } from "@interfaces/ResponseErrorInterface";
import { PaginationInterface } from "@interfaces/backoffice/PaginationInterface";
import { GetUserListParams, UserListFilterInterface, UserListInterface, UserListSliceInterface } from "@interfaces/backoffice/UserInterface";
import UserApi from "@repositories/backoffice/UserApi";
import AuthService from "@services/backoffice/AuthService";
import store, { useAppSelector } from "@store/Store";
import { deleteById, update, updateFilter } from "@store/slices/backoffice/UserListSlice";

class UserListService {
  public clearState() {
    store.dispatch(update({ data: [], paginate: null, filter: null, is_loading: false, error: "" }));
  }

  public getState(): UserListSliceInterface {
    return useAppSelector((state) => state.backoffice.userList, shallowEqual);
  }

  public getData(): UserListInterface[] {
    return useAppSelector((state) => state.backoffice.userList.data, shallowEqual);
  }

  public getIsLoaded(): boolean {
    return useAppSelector((state) => state.backoffice.userList.paginate != null, shallowEqual);
  }

  public getPaginate(): PaginationInterface | null {
    return useAppSelector((state) => state.backoffice.userList.paginate, shallowEqual);
  }

  public getFilter(): UserListFilterInterface | null {
    return useAppSelector((state) => state.backoffice.userList.filter, shallowEqual);
  }

  public getStatus(): UserStatusEnum | null {
    return useAppSelector((state) => state.backoffice.userList.filter?.status ?? null, shallowEqual);
  }

  public getStartDate(): string | null {
    return useAppSelector((state) => state.backoffice.userList.filter?.start_date ?? null, shallowEqual);
  }

  public getEndDate(): string | null {
    return useAppSelector((state) => state.backoffice.userList.filter?.end_date ?? null, shallowEqual);
  }

  public getIsLoading(): boolean {
    return useAppSelector((state) => state.backoffice.userList.is_loading, shallowEqual);
  }

  public getError(): string {
    return useAppSelector((state) => state.backoffice.userList.error, shallowEqual);
  }

  public update(params: any): void {
    store.dispatch(update(params));
  }

  public updateFilter(params: any): void {
    store.dispatch(updateFilter(params));
  }

  public deleteById(id: number): void {
    store.dispatch(deleteById({ id: id }));
  }

  public loadUserList(
    q?: string,
    status?: UserStatusEnum,
    startDate?: string,
    endDate?: string,
    page: number = 1,
    orderBy: string = "-id",
    perPage: number = 16,
  ): void {
    const params: GetUserListParams = {
      page: page,
      order_by: orderBy,
      per_page: perPage,
    };

    if (q != undefined) {
      params["q"] = q;
    }

    if (status != undefined) {
      params["status"] = status;
    }

    if (startDate != undefined) {
      params["start_date"] = startDate;
    }

    if (endDate != undefined) {
      params["end_date"] = endDate;
    }

    store.dispatch(update({ is_loading: true, filter: params }));

    UserApi.index(params)
      .then((response) => {
        const { data, ...paginate } = response;
        store.dispatch(update({ data: data, paginate: paginate, is_loading: false }));
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.loadUserList(q, status, startDate, endDate, page, orderBy);
            });
            break;
          default:
            store.dispatch(update({ is_loading: false, error: JSON.stringify(e.data) }));
            throw e;
        }
      });
  }
}

export default new UserListService();
