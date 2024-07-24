import { StoryReactionParams, StoryReactionResponse, StoryShowParams, StoryShowResponse } from "@interfaces/frontside/StoryInterface";
import StoryMockApi from "@mocks/frontside/StoryMockApi";
import ApiClient from "@repositories/ApiClient";

type ReturnType<T> = Promise<T>;

class StoryApi {
  private baseUrl = import.meta.env.VITE_FRONT_SIDE_API_URL;

  public async show(params: StoryShowParams): ReturnType<StoryShowResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return StoryMockApi.show(params, true);
    }
    return ApiClient.get<StoryShowParams, StoryShowResponse>(`${this.baseUrl}/story/${params.slug}`, params);
  }

  public async reaction(params: StoryReactionParams): ReturnType<StoryReactionResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return StoryMockApi.reaction(params, true);
    }
    return ApiClient.put<StoryReactionParams, StoryReactionResponse>(`${this.baseUrl}/story-reaction/${params.story_id}`, params);
  }
}

export default new StoryApi();
