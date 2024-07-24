import { StorySearchParams, StorySearchResponse } from "@interfaces/frontside/StorySearchInterface";
import StorySearchMockApi from "@mocks/frontside/StorySearchMockApi";
import ApiClient from "@repositories/ApiClient";

type ReturnType<T> = Promise<T>;

class StorySearchApi {
  private baseUrl = import.meta.env.VITE_FRONT_SIDE_API_URL;

  public async search(params: StorySearchParams): ReturnType<StorySearchResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return StorySearchMockApi.search(params, true);
    }
    return ApiClient.get<StorySearchParams, StorySearchResponse>(`${this.baseUrl}/story-search`, params);
  }
}

export default new StorySearchApi();
