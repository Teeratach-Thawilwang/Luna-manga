import { shallowEqual } from "react-redux";

import { ResponseErrorEnum } from "@enums/ResponseErrorEnum";
import { CustomerGroupStatusEnum } from "@enums/backoffice/StatusEnum";
import { AxiosResponseError } from "@interfaces/ResponseErrorInterface";
import {
  CustomerGroupListFilterInterface,
  CustomerGroupListInterface,
  CustomerGroupListSliceInterface,
  GetCustomerGroupListParams,
} from "@interfaces/backoffice/CustomerGroupInterface";
import { PaginationInterface } from "@interfaces/backoffice/PaginationInterface";
import CustomerGroupApi from "@repositories/backoffice/CustomerGroupApi";
import AuthService from "@services/backoffice/AuthService";
import store, { useAppSelector } from "@store/Store";
import { update, updateFilter } from "@store/slices/backoffice/CustomerGroupListSlice";

class CustomerGroupListService {
  public clearState() {
    store.dispatch(update({ data: [], paginate: null, filter: null, is_loading: false, error: "" }));
  }

  public getState(): CustomerGroupListSliceInterface {
    return useAppSelector((state) => state.backoffice.customerGroupList, shallowEqual);
  }

  public getData(): CustomerGroupListInterface[] {
    return useAppSelector((state) => state.backoffice.customerGroupList.data, shallowEqual);
  }

  public getIsLoaded(): boolean {
    return useAppSelector((state) => state.backoffice.customerGroupList.paginate != null, shallowEqual);
  }

  public getPaginate(): PaginationInterface | null {
    return useAppSelector((state) => state.backoffice.customerGroupList.paginate, shallowEqual);
  }

  public getFilter(): CustomerGroupListFilterInterface | null {
    return useAppSelector((state) => state.backoffice.customerGroupList.filter, shallowEqual);
  }

  public getStatus(): CustomerGroupStatusEnum | null {
    return useAppSelector((state) => state.backoffice.customerGroupList.filter?.status ?? null, shallowEqual);
  }

  public getStartDate(): string | null {
    return useAppSelector((state) => state.backoffice.customerGroupList.filter?.start_date ?? null, shallowEqual);
  }

  public getEndDate(): string | null {
    return useAppSelector((state) => state.backoffice.customerGroupList.filter?.end_date ?? null, shallowEqual);
  }

  public getIsLoading(): boolean {
    return useAppSelector((state) => state.backoffice.customerGroupList.is_loading, shallowEqual);
  }

  public getError(): string {
    return useAppSelector((state) => state.backoffice.customerGroupList.error, shallowEqual);
  }

  public update(params: any): void {
    store.dispatch(update(params));
  }

  public updateFilter(params: any): void {
    store.dispatch(updateFilter(params));
  }

  public loadCustomerGroupList(
    q?: string,
    status?: CustomerGroupStatusEnum,
    startDate?: string,
    endDate?: string,
    page: number = 1,
    orderBy: string = "-id",
    perPage: number = 16,
  ): void {
    const params: GetCustomerGroupListParams = {
      page: page,
      per_page: perPage,
      order_by: orderBy,
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

    CustomerGroupApi.index(params)
      .then((response) => {
        const { data, ...paginate } = response;
        store.dispatch(update({ data: data, paginate: paginate, is_loading: false }));
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.loadCustomerGroupList(q, status, startDate, endDate, page, orderBy, perPage);
            });
            break;
          default:
            store.dispatch(update({ is_loading: false, error: JSON.stringify(e.data) }));
            throw e;
        }
      });
  }
}

export default new CustomerGroupListService();
