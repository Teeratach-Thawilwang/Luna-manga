import { ChapterReactionParams, ChapterReactionResponse, ChapterShowParams, ChapterShowResponse } from "@interfaces/frontside/ChapterInterface";
import ChapterMockApi from "@mocks/frontside/ChapterMockApi";
import ApiClient from "@repositories/ApiClient";

type ReturnType<T> = Promise<T>;

class ChapterApi {
  private baseUrl = import.meta.env.VITE_FRONT_SIDE_API_URL;

  public async show(params: ChapterShowParams): ReturnType<ChapterShowResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return ChapterMockApi.show(params, true);
    }
    return ApiClient.get<ChapterShowParams, ChapterShowResponse>(`${this.baseUrl}/story/${params.slug}/chapter/${params.chapter_number}`, params);
  }

  public async reaction(params: ChapterReactionParams): ReturnType<ChapterReactionResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return ChapterMockApi.reaction(params, true);
    }
    return ApiClient.put<ChapterReactionParams, ChapterReactionResponse>(`${this.baseUrl}/chapter-reaction/${params.chapter_id}`, params);
  }
}

export default new ChapterApi();
