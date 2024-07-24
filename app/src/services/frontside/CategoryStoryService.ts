import { shallowEqual } from "react-redux";

import { ResponseErrorEnum } from "@enums/ResponseErrorEnum";
import { AxiosResponseError } from "@interfaces/ResponseErrorInterface";
import { CategoryStoryIndexParams, CategoryStoryInterface, CategoryStorySliceInterface } from "@interfaces/frontside/CategoryStoryInterface";
import { PaginationInterface } from "@interfaces/frontside/PaginationInterface";
import CategoryStoryApi from "@repositories/frontside/CategoryStoryApi";
import AuthService from "@services/frontside/AuthService";
import store, { useAppSelector } from "@store/Store";
import { pushStories, update } from "@store/slices/frontside/CategoryStorySlice";
import { navigateTo } from "@utils/Helpers";

class CategoryStoryService {
  public clearState() {
    store.dispatch(update({ data: [], category_selected_id: null, paginate: null, is_loading: false, error: "" }));
  }

  public getState(): CategoryStorySliceInterface {
    return useAppSelector((state) => state.frontside.categoryStory, shallowEqual);
  }

  public getStory(): CategoryStoryInterface[] {
    return useAppSelector((state) => state.frontside.categoryStory.data, shallowEqual);
  }

  public getCategorySelectedId(): number | null {
    return useAppSelector((state) => state.frontside.categoryStory.category_selected_id, shallowEqual);
  }

  public getIsLoading(): boolean {
    return useAppSelector((state) => state.frontside.categoryStory.is_loading, shallowEqual);
  }

  public getIsLoaded(): boolean {
    return useAppSelector((state) => state.frontside.categoryStory.paginate != null, shallowEqual);
  }

  public getCurrentPage(): number {
    return useAppSelector((state) => state.frontside.categoryStory.paginate?.current ?? 1, shallowEqual);
  }

  public getPaginate(): PaginationInterface | null {
    return useAppSelector((state) => state.frontside.categoryStory.paginate, shallowEqual);
  }

  public getError(): string {
    return useAppSelector((state) => state.frontside.categoryStory.error, shallowEqual);
  }

  public update(params: any): void {
    store.dispatch(update(params));
  }

  public pushStories(data: CategoryStoryInterface): void {
    store.dispatch(pushStories(data));
  }

  public loadIndex(id: number, page: number = 1, perPage: number = 15, orderBy?: string): void {
    store.dispatch(update({ is_loading: true }));

    const params: CategoryStoryIndexParams = {
      id: id,
      page: page,
      per_page: perPage,
    };

    if (orderBy != undefined) {
      params["order_by"] = orderBy;
    }

    CategoryStoryApi.index(params)
      .then((response) => {
        const { data, ...paginate } = response;
        store.dispatch(update({ category_selected_id: id, data: data, paginate: paginate, is_loading: false }));
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.loadIndex(id, page, perPage);
            });
            break;
          default:
            store.dispatch(update({ is_loading: false, error: e.data }));
            navigateTo(`/something-went-wrong?data=${JSON.stringify(e.data)}`);
            throw e;
        }
      });
  }
}

export default new CategoryStoryService();
