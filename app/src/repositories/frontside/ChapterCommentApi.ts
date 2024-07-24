import {
  ChapterCommentParams,
  ChapterCommentReactionParams,
  ChapterCommentReactionResponse,
  ChapterCommentResponse,
  CreateCommentParams,
  CreateCommentResponse,
  DeleteCommentParams,
  DeleteCommentResponse,
} from "@interfaces/frontside/ChapterCommentInterface";
import ChapterCommentMockApi from "@mocks/frontside/ChapterCommentMockApi";
import ApiClient from "@repositories/ApiClient";

type ReturnType<T> = Promise<T>;

class ChapterCommentApi {
  private baseUrl = import.meta.env.VITE_FRONT_SIDE_API_URL;

  public async index(params: ChapterCommentParams): ReturnType<ChapterCommentResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return ChapterCommentMockApi.index(params, true);
    }
    return ApiClient.get<ChapterCommentParams, ChapterCommentResponse>(`${this.baseUrl}/comments`, params);
  }

  public async createComment(params: CreateCommentParams): ReturnType<CreateCommentResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return ChapterCommentMockApi.createComment(params, true);
    }
    return ApiClient.postJson<CreateCommentParams, CreateCommentResponse>(`${this.baseUrl}/comments`, params);
  }

  public async delete(params: DeleteCommentParams): ReturnType<DeleteCommentResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return ChapterCommentMockApi.delete(params, true);
    }
    return ApiClient.delete<DeleteCommentParams, DeleteCommentResponse>(`${this.baseUrl}/comments/${params.comment_id}`, params);
  }

  public async reaction(params: ChapterCommentReactionParams): ReturnType<ChapterCommentReactionResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return ChapterCommentMockApi.reaction(params, true);
    }
    return ApiClient.put<ChapterCommentReactionParams, ChapterCommentReactionResponse>(
      `${this.baseUrl}/comment-reaction/${params.comment_id}`,
      params,
    );
  }
}

export default new ChapterCommentApi();
