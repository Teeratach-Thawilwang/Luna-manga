import { shallowEqual } from "react-redux";

import { ResponseErrorEnum } from "@enums/ResponseErrorEnum";
import { CustomerReportGroupEnum } from "@enums/backoffice/CustomerReportGroupEnum";
import { CustomerReportSourceEnum } from "@enums/backoffice/CustomerReportSourceEnum";
import { AxiosResponseError } from "@interfaces/ResponseErrorInterface";
import {
  CustomerReportListFilterInterface,
  CustomerReportListInterface,
  CustomerReportListSliceInterface,
  GetCustomerReportListParams,
} from "@interfaces/backoffice/CustomerReportInterface";
import { PaginationInterface } from "@interfaces/backoffice/PaginationInterface";
import CustomerReportApi from "@repositories/backoffice/CustomerReportApi";
import AuthService from "@services/backoffice/AuthService";
import store, { useAppSelector } from "@store/Store";
import { update, updateFilter } from "@store/slices/backoffice/CustomerReportListSlice";

class CustomerReportListService {
  public clearState() {
    store.dispatch(update({ data: [], paginate: null, filter: null, is_loading: false, error: "" }));
  }

  public getState(): CustomerReportListSliceInterface {
    return useAppSelector((state) => state.backoffice.customerReportList, shallowEqual);
  }

  public getData(): CustomerReportListInterface[] {
    return useAppSelector((state) => state.backoffice.customerReportList.data, shallowEqual);
  }

  public getIsLoaded(): boolean {
    return useAppSelector((state) => state.backoffice.customerReportList.paginate != null, shallowEqual);
  }

  public getPaginate(): PaginationInterface | null {
    return useAppSelector((state) => state.backoffice.customerReportList.paginate, shallowEqual);
  }

  public getFilter(): CustomerReportListFilterInterface | null {
    return useAppSelector((state) => state.backoffice.customerReportList.filter, shallowEqual);
  }

  public getGroup(): CustomerReportGroupEnum | null {
    return useAppSelector((state) => state.backoffice.customerReportList.filter?.group ?? null, shallowEqual);
  }

  public getSource(): CustomerReportSourceEnum | null {
    return useAppSelector((state) => state.backoffice.customerReportList.filter?.source ?? null, shallowEqual);
  }

  public getStartDate(): string | null {
    return useAppSelector((state) => state.backoffice.customerReportList.filter?.start_date ?? null, shallowEqual);
  }

  public getEndDate(): string | null {
    return useAppSelector((state) => state.backoffice.customerReportList.filter?.end_date ?? null, shallowEqual);
  }

  public getIsLoading(): boolean {
    return useAppSelector((state) => state.backoffice.customerReportList.is_loading, shallowEqual);
  }

  public getError(): string {
    return useAppSelector((state) => state.backoffice.customerReportList.error, shallowEqual);
  }

  public update(params: any): void {
    store.dispatch(update(params));
  }

  public updateFilter(params: any): void {
    store.dispatch(updateFilter(params));
  }

  public loadCustomerReportList(
    q?: string,
    group?: CustomerReportGroupEnum,
    source?: CustomerReportSourceEnum,
    isAccept?: boolean,
    startDate?: string,
    endDate?: string,
    page: number = 1,
    orderBy: string = "-id",
    perPage: number = 16,
  ): void {
    const params: GetCustomerReportListParams = {
      page: page,
      per_page: perPage,
      order_by: orderBy,
    };

    if (q != undefined) {
      params["q"] = q;
    }

    if (group != undefined) {
      params["group"] = group;
    }

    if (source != undefined) {
      params["source"] = source;
    }

    if (isAccept != undefined) {
      params["is_accept"] = isAccept;
    }

    if (startDate != undefined) {
      params["start_date"] = startDate;
    }

    if (endDate != undefined) {
      params["end_date"] = endDate;
    }

    store.dispatch(update({ is_loading: true, filter: params }));

    CustomerReportApi.index(params)
      .then((response) => {
        const { data, ...paginate } = response;
        store.dispatch(update({ data: data, paginate: paginate, is_loading: false }));
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.loadCustomerReportList(q, group, source, isAccept, startDate, endDate, page, orderBy);
            });
            break;
          default:
            store.dispatch(update({ is_loading: false, error: JSON.stringify(e.data) }));
            throw e;
        }
      });
  }
}

export default new CustomerReportListService();
