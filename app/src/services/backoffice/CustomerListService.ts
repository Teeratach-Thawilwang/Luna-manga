import { shallowEqual } from "react-redux";

import { ResponseErrorEnum } from "@enums/ResponseErrorEnum";
import { CustomerStatusEnum } from "@enums/backoffice/StatusEnum";
import { AxiosResponseError } from "@interfaces/ResponseErrorInterface";
import {
  CustomerListFilterInterface,
  CustomerListInterface,
  CustomerListSliceInterface,
  GetCustomerListParams,
} from "@interfaces/backoffice/CustomerInterface";
import { PaginationInterface } from "@interfaces/backoffice/PaginationInterface";
import CustomerApi from "@repositories/backoffice/CustomerApi";
import AuthService from "@services/backoffice/AuthService";
import store, { useAppSelector } from "@store/Store";
import { update, updateFilter } from "@store/slices/backoffice/CustomerListSlice";

class CustomerListService {
  public clearState() {
    store.dispatch(update({ data: [], paginate: null, filter: null, is_loading: false, error: "" }));
  }

  public getState(): CustomerListSliceInterface {
    return useAppSelector((state) => state.backoffice.customerList, shallowEqual);
  }

  public getData(): CustomerListInterface[] {
    return useAppSelector((state) => state.backoffice.customerList.data, shallowEqual);
  }

  public getIsLoaded(): boolean {
    return useAppSelector((state) => state.backoffice.customerList.paginate != null, shallowEqual);
  }

  public getPaginate(): PaginationInterface | null {
    return useAppSelector((state) => state.backoffice.customerList.paginate, shallowEqual);
  }

  public getFilter(): CustomerListFilterInterface | null {
    return useAppSelector((state) => state.backoffice.customerList.filter, shallowEqual);
  }

  public getStatus(): CustomerStatusEnum | null {
    return useAppSelector((state) => state.backoffice.customerList.filter?.status ?? null, shallowEqual);
  }

  public getStartDate(): string | null {
    return useAppSelector((state) => state.backoffice.customerList.filter?.start_date ?? null, shallowEqual);
  }

  public getEndDate(): string | null {
    return useAppSelector((state) => state.backoffice.customerList.filter?.end_date ?? null, shallowEqual);
  }

  public getIsLoading(): boolean {
    return useAppSelector((state) => state.backoffice.customerList.is_loading, shallowEqual);
  }

  public getError(): string {
    return useAppSelector((state) => state.backoffice.customerList.error, shallowEqual);
  }

  public update(params: any): void {
    store.dispatch(update(params));
  }

  public updateFilter(params: any): void {
    store.dispatch(updateFilter(params));
  }

  public loadCustomerList(
    q?: string,
    status?: CustomerStatusEnum,
    startDate?: string,
    endDate?: string,
    page: number = 1,
    orderBy: string = "-id",
  ): void {
    const params: GetCustomerListParams = {
      page: page,
      per_page: 16,
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

    CustomerApi.index(params)
      .then((response) => {
        const { data, ...paginate } = response;
        store.dispatch(update({ data: data, paginate: paginate, is_loading: false }));
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.loadCustomerList(q, status, startDate, endDate, page, orderBy);
            });
            break;
          default:
            store.dispatch(update({ is_loading: false, error: JSON.stringify(e.data) }));
            throw e;
        }
      });
  }
}

export default new CustomerListService();
