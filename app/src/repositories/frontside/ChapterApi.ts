import { ChapterReactionParams, ChapterReactionResponse, ChapterShowParams, ChapterShowResponse } from "@interfaces/frontside/ChapterInterface";
// import ChapterMockApi from "@mocks/frontside/ChapterMockApi";
import ApiClient from "@repositories/ApiClient";

type ReturnType<T> = Promise<T>;

class ChapterApi {
  private baseUrl = import.meta.env.VITE_FRONT_SIDE_API_URL;

  private async getMockApi() {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      const module = await import("@mocks/frontside/ChapterMockApi");
      return module.default;
    }
    return null;
  }

  public async show(params: ChapterShowParams): ReturnType<ChapterShowResponse> {
    const ChapterMockApi = await this.getMockApi();
    if (ChapterMockApi) {
      return ChapterMockApi.show(params, true);
    }
    return ApiClient.get<ChapterShowParams, ChapterShowResponse>(`${this.baseUrl}/story/${params.slug}/chapter/${params.chapter_number}`, params);
  }

  public async reaction(params: ChapterReactionParams): ReturnType<ChapterReactionResponse> {
    const ChapterMockApi = await this.getMockApi();
    if (ChapterMockApi) {
      return ChapterMockApi.reaction(params, true);
    }
    return ApiClient.put<ChapterReactionParams, ChapterReactionResponse>(`${this.baseUrl}/chapter-reaction/${params.chapter_id}`, params);
  }
}

export default new ChapterApi();
