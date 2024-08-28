import { StorySearchParams, StorySearchResponse } from "@interfaces/frontside/StorySearchInterface";
import ApiClient from "@repositories/frontside/ApiClient";

type ReturnType<T> = Promise<T>;

class StorySearchApi {
  private baseUrl = import.meta.env.VITE_FRONT_SIDE_API_URL;

  private async getMockApi() {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      const module = await import("@mocks/frontside/StorySearchMockApi");
      return module.default;
    }
    return null;
  }

  public async search(params: StorySearchParams): ReturnType<StorySearchResponse> {
    const StorySearchMockApi = await this.getMockApi();
    if (StorySearchMockApi) {
      return StorySearchMockApi.search(params, true);
    }
    return ApiClient.get<StorySearchParams, StorySearchResponse>(`${this.baseUrl}/story-search`, params);
  }
}

export default new StorySearchApi();
