import { shallowEqual } from "react-redux";
import { toast } from "react-toastify";

import { ResponseErrorEnum } from "@enums/ResponseErrorEnum";
import { CategoryTypeEnum } from "@enums/backoffice/CategoryTypeEnum";
import { AxiosResponseError } from "@interfaces/ResponseErrorInterface";
import { GetStoryParams, StoryInterface, StorySliceInterface } from "@interfaces/backoffice/StoryInterface";
import StoryApi from "@repositories/backoffice/StoryApi";
import AuthService from "@services/backoffice/AuthService";
import store, { useAppSelector } from "@store/Store";
import { update } from "@store/slices/backoffice/StorySlice";

class StoryService {
  public clearState() {
    store.dispatch(update({ data: null, is_loading: false, error: "" }));
  }

  public getState(): StorySliceInterface {
    return useAppSelector((state) => state.backoffice.story, shallowEqual);
  }

  public getterChapter<T>(key: string): T {
    return useAppSelector((state) => state.backoffice.story.data![key], shallowEqual) as T;
  }

  public getStory(): StoryInterface | null {
    return useAppSelector((state) => state.backoffice.story.data, shallowEqual);
  }

  public getIsLoading(): boolean {
    return useAppSelector((state) => state.backoffice.story.is_loading, shallowEqual);
  }

  public getIsLoaded(): boolean {
    return useAppSelector((state) => state.backoffice.story.data != null, shallowEqual);
  }

  public getStoryType(): CategoryTypeEnum | null {
    return useAppSelector((state) => state.backoffice.story.data?.type ?? null, shallowEqual);
  }

  public update(params: any): void {
    store.dispatch(update(params));
  }

  public loadShow(id: number): void {
    const params: GetStoryParams = {
      id: id,
    };
    store.dispatch(update({ is_loading: true }));

    StoryApi.show(params)
      .then((response) => {
        store.dispatch(update({ data: response, is_loading: false }));
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.loadShow(id);
            });
            break;
          default:
            toast.error(String(e.data.error));
            store.dispatch(update({ is_loading: false, error: JSON.stringify(e.data) }));
            throw e;
        }
      });
  }
}

export default new StoryService();
