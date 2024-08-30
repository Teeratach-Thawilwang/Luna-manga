import { shallowEqual } from "react-redux";

import { ResponseErrorEnum } from "@enums/ResponseErrorEnum";
import { AxiosResponseError } from "@interfaces/ResponseErrorInterface";
import { StoryInterface, StoryReactionParams, StoryShowParams, StorySliceInterface } from "@interfaces/StoryInterface";
import StoryApi from "@repositories/StoryApi";
import AuthService from "@services/AuthService";
import store, { useAppSelector } from "@store/Store";
import { update, updateData, updateReaction } from "@store/slices/StorySlice";
import { navigateTo } from "@utils/Helpers";

class StoryService {
  public clearState() {
    store.dispatch(update({ data: null, is_loading: false, error: "" }));
  }

  public getState(): StorySliceInterface {
    return useAppSelector((state) => state.story, shallowEqual);
  }

  public getStory(): StoryInterface | null {
    return useAppSelector((state) => state.story.data, shallowEqual);
  }

  public getIsBookmark(): boolean {
    return useAppSelector((state) => state.story.data?.is_bookmark ?? false, shallowEqual);
  }

  public getStoryIsLoaded(): boolean {
    return useAppSelector((state) => state.story.data !== null, shallowEqual);
  }

  public getStoryIsLoading(): boolean {
    return useAppSelector((state) => state.story.is_loading, shallowEqual);
  }

  public getStoryError(): string {
    return useAppSelector((state) => state.story.error, shallowEqual);
  }

  public updateData(params: any): void {
    store.dispatch(updateData(params));
  }

  public loadStory(slug: string): void {
    store.dispatch(update({ data: null, is_loading: true }));

    const params: StoryShowParams = {
      slug: slug,
    };

    StoryApi.show(params)
      .then((response) => {
        const data = response as StoryInterface;
        store.dispatch(update({ data: data, is_loading: false }));
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.loadStory(slug);
            });
            break;
          default:
            store.dispatch(update({ is_loading: false, error: e.data }));
            navigateTo(`/something-went-wrong?data=${JSON.stringify(e.data)}`);
            throw e;
        }
      });
  }

  public reaction(customerId: number, storyId: number, like?: number, dislike?: number): void {
    const params: StoryReactionParams = {
      customer_id: customerId,
      story_id: storyId,
    };

    if (like != undefined) {
      params["like"] = like;
    }

    if (dislike != undefined) {
      params["dislike"] = dislike;
    }

    StoryApi.reaction(params)
      .then((response) => {
        const data = { reaction: { ...response } };
        store.dispatch(updateReaction(data));
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.reaction(customerId, storyId, like, dislike);
            });
            break;
          default:
            navigateTo(`/something-went-wrong?data=${JSON.stringify(e.data)}`);
            throw e;
        }
      });
  }
}

export default new StoryService();
