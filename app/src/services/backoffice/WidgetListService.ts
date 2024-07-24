import { shallowEqual } from "react-redux";

import { ResponseErrorEnum } from "@enums/ResponseErrorEnum";
import { WidgetStatusEnum } from "@enums/backoffice/StatusEnum";
import { WidgetTypeEnum } from "@enums/backoffice/WidgetTypeEnum";
import { AxiosResponseError } from "@interfaces/ResponseErrorInterface";
import { PaginationInterface } from "@interfaces/backoffice/PaginationInterface";
import {
  GetWidgetListParams,
  WidgetListFilterInterface,
  WidgetListInterface,
  WidgetListSliceInterface,
} from "@interfaces/backoffice/WidgetInterface";
import WidgetApi from "@repositories/backoffice/WidgetApi";
import AuthService from "@services/backoffice/AuthService";
import store, { useAppSelector } from "@store/Store";
import { deleteById, update, updateFilter } from "@store/slices/backoffice/WidgetListSlice";

class WidgetListService {
  public clearState() {
    store.dispatch(update({ data: [], paginate: null, filter: null, is_loading: false, error: "" }));
  }

  public getState(): WidgetListSliceInterface {
    return useAppSelector((state) => state.backoffice.widgetList, shallowEqual);
  }

  public getData(): WidgetListInterface[] {
    return useAppSelector((state) => state.backoffice.widgetList.data, shallowEqual);
  }

  public getIsLoaded(): boolean {
    return useAppSelector((state) => state.backoffice.widgetList.paginate != null, shallowEqual);
  }

  public getPaginate(): PaginationInterface | null {
    return useAppSelector((state) => state.backoffice.widgetList.paginate, shallowEqual);
  }

  public getFilter(): WidgetListFilterInterface | null {
    return useAppSelector((state) => state.backoffice.widgetList.filter, shallowEqual);
  }

  public getStatus(): WidgetStatusEnum | null {
    return useAppSelector((state) => state.backoffice.widgetList.filter?.status ?? null, shallowEqual);
  }

  public getType(): WidgetTypeEnum | null {
    return useAppSelector((state) => state.backoffice.widgetList.filter?.type ?? null, shallowEqual);
  }

  public getStartDate(): string | null {
    return useAppSelector((state) => state.backoffice.widgetList.filter?.start_date ?? null, shallowEqual);
  }

  public getEndDate(): string | null {
    return useAppSelector((state) => state.backoffice.widgetList.filter?.end_date ?? null, shallowEqual);
  }

  public getIsLoading(): boolean {
    return useAppSelector((state) => state.backoffice.widgetList.is_loading, shallowEqual);
  }

  public getError(): string {
    return useAppSelector((state) => state.backoffice.widgetList.error, shallowEqual);
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

  public loadWidgetList(
    q?: string,
    status?: WidgetStatusEnum,
    type?: WidgetTypeEnum,
    startDate?: string,
    endDate?: string,
    page: number = 1,
    orderBy: string = "-id",
    perPage: number = 16,
  ): void {
    const params: GetWidgetListParams = {
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

    if (type != undefined) {
      params["type"] = type;
    }

    if (startDate != undefined) {
      params["start_date"] = startDate;
    }

    if (endDate != undefined) {
      params["end_date"] = endDate;
    }

    store.dispatch(update({ is_loading: true, filter: params }));

    WidgetApi.index(params)
      .then((response) => {
        const { data, ...paginate } = response;
        store.dispatch(update({ data: data, paginate: paginate, is_loading: false }));
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.loadWidgetList(q, status, type, startDate, endDate, page, orderBy);
            });
            break;
          default:
            store.dispatch(update({ is_loading: false, error: JSON.stringify(e.data) }));
            throw e;
        }
      });
  }
}

export default new WidgetListService();
