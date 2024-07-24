import { shallowEqual } from "react-redux";

import { ResponseErrorEnum } from "@enums/ResponseErrorEnum";
import { AxiosResponseError } from "@interfaces/ResponseErrorInterface";
import { PaginationInterface } from "@interfaces/frontside/PaginationInterface";
import { StoryChapterInterface, StoryChapterParams, StoryChapterSliceInterface } from "@interfaces/frontside/StoryChapterInterface";
import StoryChapterApi from "@repositories/frontside/StoryChapterApi";
import AuthService from "@services/frontside/AuthService";
import store, { useAppSelector } from "@store/Store";
import { update } from "@store/slices/frontside/StoryChapterSlice";
import { navigateTo } from "@utils/Helpers";

class StoryChapterService {
  public clearState() {
    store.dispatch(update({ data: [], paginate: null, is_loading: false, error: "" }));
  }

  public getState(): StoryChapterSliceInterface {
    return useAppSelector((state) => state.frontside.storyChapter, shallowEqual);
  }

  public getStoryChapter(): StoryChapterInterface[] {
    return useAppSelector((state) => state.frontside.storyChapter.data, shallowEqual);
  }

  public getStoryChapterIsLoaded(): boolean {
    return useAppSelector((state) => state.frontside.storyChapter.paginate != null, shallowEqual);
  }

  public getStoryChapterPaginate(): PaginationInterface | null {
    return useAppSelector((state) => state.frontside.storyChapter.paginate, shallowEqual);
  }

  public getIsLoading(): boolean {
    return useAppSelector((state) => state.frontside.storyChapter.is_loading, shallowEqual);
  }

  public getStoryChapterError(): string {
    return useAppSelector((state) => state.frontside.storyChapter.error, shallowEqual);
  }

  public update(params: any): void {
    store.dispatch(update(params));
  }

  public loadStoryChapter(slug: string, page: number, perPage: number = 15): void {
    store.dispatch(update({ is_loading: true }));

    const params: StoryChapterParams = {
      slug: slug,
      page: page,
      per_page: perPage,
    };

    StoryChapterApi.index(params)
      .then((response) => {
        const { data, ...paginate } = response;
        store.dispatch(update({ data: data, paginate: paginate, is_loading: false }));
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.loadStoryChapter(slug, page, perPage);
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

export default new StoryChapterService();
