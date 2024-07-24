import { shallowEqual } from "react-redux";

import { ResponseErrorEnum } from "@enums/ResponseErrorEnum";
import { CategoryTypeEnum } from "@enums/backoffice/CategoryTypeEnum";
import { StoryStatusEnum } from "@enums/backoffice/StatusEnum";
import { AxiosResponseError } from "@interfaces/ResponseErrorInterface";
import { PaginationInterface } from "@interfaces/backoffice/PaginationInterface";
import { GetStoryListParams, StoryListFilterInterface, StoryListInterface, StoryListSliceInterface } from "@interfaces/backoffice/StoryInterface";
import StoryApi from "@repositories/backoffice/StoryApi";
import AuthService from "@services/backoffice/AuthService";
import store, { useAppSelector } from "@store/Store";
import { update, updateFilter } from "@store/slices/backoffice/StoryListSlice";

class StoryListService {
  public clearState() {
    store.dispatch(update({ data: [], paginate: null, filter: null, is_loading: false, error: "" }));
  }

  public getState(): StoryListSliceInterface {
    return useAppSelector((state) => state.backoffice.storyList, shallowEqual);
  }

  public getData(): StoryListInterface[] {
    return useAppSelector((state) => state.backoffice.storyList.data, shallowEqual);
  }

  public getIsLoaded(): boolean {
    return useAppSelector((state) => state.backoffice.storyList.paginate != null, shallowEqual);
  }

  public getPaginate(): PaginationInterface | null {
    return useAppSelector((state) => state.backoffice.storyList.paginate, shallowEqual);
  }

  public getFilter(): StoryListFilterInterface | null {
    return useAppSelector((state) => state.backoffice.storyList.filter, shallowEqual);
  }

  public getStatus(): StoryStatusEnum | null {
    return useAppSelector((state) => state.backoffice.storyList.filter?.status ?? null, shallowEqual);
  }

  public getStartDate(): string | null {
    return useAppSelector((state) => state.backoffice.storyList.filter?.start_date ?? null, shallowEqual);
  }

  public getEndDate(): string | null {
    return useAppSelector((state) => state.backoffice.storyList.filter?.end_date ?? null, shallowEqual);
  }

  public getIsLoading(): boolean {
    return useAppSelector((state) => state.backoffice.storyList.is_loading, shallowEqual);
  }

  public getError(): string {
    return useAppSelector((state) => state.backoffice.storyList.error, shallowEqual);
  }

  public update(params: any): void {
    store.dispatch(update(params));
  }

  public updateFilter(params: any): void {
    store.dispatch(updateFilter(params));
  }

  public loadStoryList(
    q?: string,
    status?: StoryStatusEnum,
    startDate?: string,
    endDate?: string,
    type?: CategoryTypeEnum,
    page: number = 1,
    orderBy: string = "-id",
    perPage: number = 16,
  ): void {
    const params: GetStoryListParams = {
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

    if (type != undefined) {
      params["type"] = type;
    }

    store.dispatch(update({ is_loading: true, filter: params }));

    StoryApi.index(params)
      .then((response) => {
        const { data, ...paginate } = response;
        store.dispatch(update({ data: data, paginate: paginate, is_loading: false }));
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.loadStoryList(q, status, startDate, endDate, type, page, orderBy);
            });
            break;
          default:
            store.dispatch(update({ is_loading: false, error: JSON.stringify(e.data) }));
            throw e;
        }
      });
  }
}

export default new StoryListService();
