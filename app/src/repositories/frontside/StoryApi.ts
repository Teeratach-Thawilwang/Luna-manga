import { StoryReactionParams, StoryReactionResponse, StoryShowParams, StoryShowResponse } from "@interfaces/frontside/StoryInterface";
import ApiClient from "@repositories/ApiClient";

type ReturnType<T> = Promise<T>;

class StoryApi {
  private baseUrl = import.meta.env.VITE_FRONT_SIDE_API_URL;

  private async getMockApi() {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      const module = await import("@mocks/frontside/StoryMockApi");
      return module.default;
    }
    return null;
  }

  public async show(params: StoryShowParams): ReturnType<StoryShowResponse> {
    const StoryMockApi = await this.getMockApi();
    if (StoryMockApi) {
      return StoryMockApi.show(params, true);
    }
    return ApiClient.get<StoryShowParams, StoryShowResponse>(`${this.baseUrl}/story/${params.slug}`, params);
  }

  public async reaction(params: StoryReactionParams): ReturnType<StoryReactionResponse> {
    const StoryMockApi = await this.getMockApi();
    if (StoryMockApi) {
      return StoryMockApi.reaction(params, true);
    }
    return ApiClient.put<StoryReactionParams, StoryReactionResponse>(`${this.baseUrl}/story-reaction/${params.story_id}`, params);
  }
}

export default new StoryApi();
