import { shallowEqual } from "react-redux";

import { ResponseErrorEnum } from "@enums/ResponseErrorEnum";
import { CategoryTypeEnum } from "@enums/backoffice/CategoryTypeEnum";
import { ChapterStatusEnum } from "@enums/backoffice/StatusEnum";
import { AxiosResponseError } from "@interfaces/ResponseErrorInterface";
import {
  ChapterListFilterInterface,
  ChapterListInterface,
  ChapterListSliceInterface,
  GetChapterListParams,
} from "@interfaces/backoffice/ChapterInterface";
import { PaginationInterface } from "@interfaces/backoffice/PaginationInterface";
import ChapterApi from "@repositories/backoffice/ChapterApi";
import AuthService from "@services/backoffice/AuthService";
import store, { useAppSelector } from "@store/Store";
import { update, updateFilter } from "@store/slices/backoffice/ChapterListSlice";

class ChapterListService {
  public clearState() {
    store.dispatch(update({ data: [], paginate: null, filter: null, is_loading: false, error: "" }));
  }

  public getState(): ChapterListSliceInterface {
    return useAppSelector((state) => state.backoffice.chapterList, shallowEqual);
  }

  public getData(): ChapterListInterface[] {
    return useAppSelector((state) => state.backoffice.chapterList.data, shallowEqual);
  }

  public getIsLoaded(): boolean {
    return useAppSelector((state) => state.backoffice.chapterList.paginate != null, shallowEqual);
  }

  public getPaginate(): PaginationInterface | null {
    return useAppSelector((state) => state.backoffice.chapterList.paginate, shallowEqual);
  }

  public getFilter(): ChapterListFilterInterface | null {
    return useAppSelector((state) => state.backoffice.chapterList.filter, shallowEqual);
  }

  public getStatus(): ChapterStatusEnum | null {
    return useAppSelector((state) => state.backoffice.chapterList.filter?.status ?? null, shallowEqual);
  }

  public getStartDate(): string | null {
    return useAppSelector((state) => state.backoffice.chapterList.filter?.start_date ?? null, shallowEqual);
  }

  public getEndDate(): string | null {
    return useAppSelector((state) => state.backoffice.chapterList.filter?.end_date ?? null, shallowEqual);
  }

  public getIsLoading(): boolean {
    return useAppSelector((state) => state.backoffice.chapterList.is_loading, shallowEqual);
  }

  public getError(): string {
    return useAppSelector((state) => state.backoffice.chapterList.error, shallowEqual);
  }

  public update(params: any): void {
    store.dispatch(update(params));
  }

  public updateFilter(params: any): void {
    store.dispatch(updateFilter(params));
  }

  public loadChapterList(
    q?: string,
    status?: ChapterStatusEnum,
    startDate?: string,
    endDate?: string,
    type: CategoryTypeEnum = CategoryTypeEnum.MANGA,
    page: number = 1,
    orderBy: string = "-id",
    perPage: number = 16,
  ): void {
    const params: GetChapterListParams = {
      type: type,
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

    // console.log(params);
    store.dispatch(update({ is_loading: true, filter: params }));

    ChapterApi.index(params)
      .then((response) => {
        const { data, ...paginate } = response;
        store.dispatch(update({ data: data, paginate: paginate, is_loading: false }));
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.loadChapterList(q, status, startDate, endDate, type, page, orderBy);
            });
            break;
          default:
            store.dispatch(update({ is_loading: false, error: JSON.stringify(e.data) }));
            throw e;
        }
      });
  }
}

export default new ChapterListService();
