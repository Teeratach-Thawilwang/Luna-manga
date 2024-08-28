import { StoryChapterParams, StoryChapterResponse } from "@interfaces/frontside/StoryChapterInterface";
import ApiClient from "@repositories/frontside/ApiClient";

type ReturnType<T> = Promise<T>;

class StoryChapterApi {
  private baseUrl = import.meta.env.VITE_FRONT_SIDE_API_URL;

  private async getMockApi() {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      const module = await import("@mocks/frontside/StoryChapterMockApi");
      return module.default;
    }
    return null;
  }

  public async index(params: StoryChapterParams): ReturnType<StoryChapterResponse> {
    const StoryChapterMockApi = await this.getMockApi();
    if (StoryChapterMockApi) {
      return StoryChapterMockApi.index(params, true);
    }
    return ApiClient.get<StoryChapterParams, StoryChapterResponse>(`${this.baseUrl}/story-chapters/${params.slug}`, params);
  }
}

export default new StoryChapterApi();
