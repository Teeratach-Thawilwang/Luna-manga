import { shallowEqual } from "react-redux";

import { ResponseErrorEnum } from "@enums/ResponseErrorEnum";
import { BannerTypeEnum } from "@enums/backoffice/BannerTypeEnum";
import { BannerStatusEnum } from "@enums/backoffice/StatusEnum";
import { AxiosResponseError } from "@interfaces/ResponseErrorInterface";
import {
  BannerListFilterInterface,
  BannerListInterface,
  BannerListSliceInterface,
  GetBannerListParams,
} from "@interfaces/backoffice/BannerInterface";
import { PaginationInterface } from "@interfaces/backoffice/PaginationInterface";
import BannerApi from "@repositories/backoffice/BannerApi";
import AuthService from "@services/backoffice/AuthService";
import store, { useAppSelector } from "@store/Store";
import { deleteById, update, updateFilter } from "@store/slices/backoffice/BannerListSlice";

class BannerListService {
  public clearState() {
    store.dispatch(update({ data: [], paginate: null, filter: null, is_loading: false, error: "" }));
  }

  public getState(): BannerListSliceInterface {
    return useAppSelector((state) => state.backoffice.bannerList, shallowEqual);
  }

  public getData(): BannerListInterface[] {
    return useAppSelector((state) => state.backoffice.bannerList.data, shallowEqual);
  }

  public getIsLoaded(): boolean {
    return useAppSelector((state) => state.backoffice.bannerList.paginate != null, shallowEqual);
  }

  public getPaginate(): PaginationInterface | null {
    return useAppSelector((state) => state.backoffice.bannerList.paginate, shallowEqual);
  }

  public getFilter(): BannerListFilterInterface | null {
    return useAppSelector((state) => state.backoffice.bannerList.filter, shallowEqual);
  }

  public getStatus(): BannerStatusEnum | null {
    return useAppSelector((state) => state.backoffice.bannerList.filter?.status ?? null, shallowEqual);
  }

  public getType(): BannerTypeEnum | null {
    return useAppSelector((state) => state.backoffice.bannerList.filter?.type ?? null, shallowEqual);
  }

  public getStartDate(): string | null {
    return useAppSelector((state) => state.backoffice.bannerList.filter?.start_date ?? null, shallowEqual);
  }

  public getEndDate(): string | null {
    return useAppSelector((state) => state.backoffice.bannerList.filter?.end_date ?? null, shallowEqual);
  }

  public getIsLoading(): boolean {
    return useAppSelector((state) => state.backoffice.bannerList.is_loading, shallowEqual);
  }

  public getError(): string {
    return useAppSelector((state) => state.backoffice.bannerList.error, shallowEqual);
  }

  public update(params: any): void {
    store.dispatch(update(params));
  }

  public deleteById(id: number): void {
    store.dispatch(deleteById({ id: id }));
  }

  public updateFilter(params: any): void {
    store.dispatch(updateFilter(params));
  }

  public loadBannerList(
    q?: string,
    status?: BannerStatusEnum,
    type?: BannerTypeEnum,
    startDate?: string,
    endDate?: string,
    page: number = 1,
    orderBy: string = "-id",
    perPage: number = 16,
  ): void {
    const params: GetBannerListParams = {
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

    BannerApi.index(params)
      .then((response) => {
        const { data, ...paginate } = response;
        store.dispatch(update({ data: data, paginate: paginate, is_loading: false }));
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.loadBannerList(q, status, type, startDate, endDate, page, orderBy);
            });
            break;
          default:
            store.dispatch(update({ is_loading: false, error: JSON.stringify(e.data) }));
            throw e;
        }
      });
  }
}

export default new BannerListService();
