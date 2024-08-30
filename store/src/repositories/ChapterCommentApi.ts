import {
  ChapterCommentParams,
  ChapterCommentReactionParams,
  ChapterCommentReactionResponse,
  ChapterCommentResponse,
  CreateCommentParams,
  CreateCommentResponse,
  DeleteCommentParams,
  DeleteCommentResponse,
} from "@interfaces/ChapterCommentInterface";
import ApiClient from "@repositories/ApiClient";

type ReturnType<T> = Promise<T>;

class ChapterCommentApi {
  private baseUrl = import.meta.env.VITE_FRONT_SIDE_API_URL;

  private async getMockApi() {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      const module = await import("@mocks/ChapterCommentMockApi");
      return module.default;
    }
    return null;
  }

  public async index(params: ChapterCommentParams): ReturnType<ChapterCommentResponse> {
    const ChapterCommentMockApi = await this.getMockApi();
    if (ChapterCommentMockApi) {
      return ChapterCommentMockApi.index(params, true);
    }
    return ApiClient.get<ChapterCommentParams, ChapterCommentResponse>(`${this.baseUrl}/comments`, params);
  }

  public async createComment(params: CreateCommentParams): ReturnType<CreateCommentResponse> {
    const ChapterCommentMockApi = await this.getMockApi();
    if (ChapterCommentMockApi) {
      return ChapterCommentMockApi.createComment(params, true);
    }
    return ApiClient.postJson<CreateCommentParams, CreateCommentResponse>(`${this.baseUrl}/comments`, params);
  }

  public async delete(params: DeleteCommentParams): ReturnType<DeleteCommentResponse> {
    const ChapterCommentMockApi = await this.getMockApi();
    if (ChapterCommentMockApi) {
      return ChapterCommentMockApi.delete(params, true);
    }
    return ApiClient.delete<DeleteCommentParams, DeleteCommentResponse>(`${this.baseUrl}/comments/${params.comment_id}`, params);
  }

  public async reaction(params: ChapterCommentReactionParams): ReturnType<ChapterCommentReactionResponse> {
    const ChapterCommentMockApi = await this.getMockApi();
    if (ChapterCommentMockApi) {
      return ChapterCommentMockApi.reaction(params, true);
    }
    return ApiClient.put<ChapterCommentReactionParams, ChapterCommentReactionResponse>(
      `${this.baseUrl}/comment-reaction/${params.comment_id}`,
      params,
    );
  }
}

export default new ChapterCommentApi();
