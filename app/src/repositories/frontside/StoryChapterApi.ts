import { StoryChapterParams, StoryChapterResponse } from "@interfaces/frontside/StoryChapterInterface";
import StoryChapterMockApi from "@mocks/frontside/StoryChapterMockApi";
import ApiClient from "@repositories/ApiClient";

type ReturnType<T> = Promise<T>;

class StoryChapterApi {
  private baseUrl = import.meta.env.VITE_FRONT_SIDE_API_URL;

  public async index(params: StoryChapterParams): ReturnType<StoryChapterResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return StoryChapterMockApi.index(params, true);
    }
    return ApiClient.get<StoryChapterParams, StoryChapterResponse>(`${this.baseUrl}/story-chapters/${params.slug}`, params);
  }
}

export default new StoryChapterApi();
