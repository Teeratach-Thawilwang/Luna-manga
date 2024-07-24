import { shallowEqual } from "react-redux";
import { toast } from "react-toastify";

import { ResponseErrorEnum } from "@enums/ResponseErrorEnum";
import { AxiosResponseError } from "@interfaces/ResponseErrorInterface";
import { StorySearchInterface, StorySearchParams, StorySearchSliceInterface } from "@interfaces/frontside/StorySearchInterface";
import StorySearchApi from "@repositories/frontside/StorySearchApi";
import AuthService from "@services/frontside/AuthService";
import store, { useAppSelector } from "@store/Store";
import { update } from "@store/slices/frontside/StorySearchSlice";

class StorySearchService {
  public clearState() {
    store.dispatch(update({ q: "", data: [], is_modal_show: false, is_loading: false, error: "" }));
  }

  public getState(): StorySearchSliceInterface {
    return useAppSelector((state) => state.frontside.storySearch, shallowEqual);
  }

  public getSearchQuery(): string {
    return useAppSelector((state) => state.frontside.storySearch.q, shallowEqual);
  }

  public getStorySearch(): StorySearchInterface[] {
    return useAppSelector((state) => state.frontside.storySearch.data, shallowEqual);
  }

  public getStorySearchIsLoaded(): boolean {
    return useAppSelector((state) => state.frontside.storySearch.data.length != 0, shallowEqual);
  }

  public getIsModalShow(): boolean {
    return useAppSelector((state) => {
      const isQ = state.frontside.storySearch.q != "";
      const isModalShow = state.frontside.storySearch.is_modal_show;
      return isQ && isModalShow;
    }, shallowEqual);
  }

  public getStorySearchIsLoading(): boolean {
    return useAppSelector((state) => state.frontside.storySearch.is_loading, shallowEqual);
  }

  public getStorySearchError(): string {
    return useAppSelector((state) => state.frontside.storySearch.error, shallowEqual);
  }

  public update(params: any): void {
    store.dispatch(update(params));
  }

  public loadStorySearch(q: string, perPage: number = 6): void {
    store.dispatch(update({ data: [], is_loading: true }));

    const params: StorySearchParams = {
      q: q,
      per_page: perPage,
    };

    StorySearchApi.search(params)
      .then((response) => {
        store.dispatch(update({ data: response.data, is_modal_show: true, is_loading: false }));
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.loadStorySearch(q, perPage);
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

export default new StorySearchService();
