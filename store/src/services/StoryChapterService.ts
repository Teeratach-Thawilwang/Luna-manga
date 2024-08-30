import { shallowEqual } from "react-redux";

import { ResponseErrorEnum } from "@enums/ResponseErrorEnum";
import { PaginationInterface } from "@interfaces/PaginationInterface";
import { AxiosResponseError } from "@interfaces/ResponseErrorInterface";
import { StoryChapterInterface, StoryChapterParams, StoryChapterSliceInterface } from "@interfaces/StoryChapterInterface";
import StoryChapterApi from "@repositories/StoryChapterApi";
import AuthService from "@services/AuthService";
import store, { useAppSelector } from "@store/Store";
import { update } from "@store/slices/StoryChapterSlice";
import { navigateTo } from "@utils/Helpers";

class StoryChapterService {
  public clearState() {
    store.dispatch(update({ data: [], paginate: null, is_loading: false, error: "" }));
  }

  public getState(): StoryChapterSliceInterface {
    return useAppSelector((state) => state.storyChapter, shallowEqual);
  }

  public getStoryChapter(): StoryChapterInterface[] {
    return useAppSelector((state) => state.storyChapter.data, shallowEqual);
  }

  public getStoryChapterIsLoaded(): boolean {
    return useAppSelector((state) => state.storyChapter.paginate != null, shallowEqual);
  }

  public getStoryChapterPaginate(): PaginationInterface | null {
    return useAppSelector((state) => state.storyChapter.paginate, shallowEqual);
  }

  public getIsLoading(): boolean {
    return useAppSelector((state) => state.storyChapter.is_loading, shallowEqual);
  }

  public getStoryChapterError(): string {
    return useAppSelector((state) => state.storyChapter.error, shallowEqual);
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
