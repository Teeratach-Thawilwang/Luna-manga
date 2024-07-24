import {
  CreateChapterParams,
  CreateChapterResponse,
  DeleteChapterParams,
  DeleteChapterResponse,
  GetChapterListParams,
  GetChapterListResponse,
  GetChapterParams,
  GetChapterResponse,
  UpdateChapterParams,
  UpdateChapterResponse,
} from "@interfaces/backoffice/ChapterInterface";
import ChapterMockApi from "@mocks/backoffice/ChapterMockApi";
import ApiClient from "@repositories/ApiClient";

type ReturnType<T> = Promise<T>;

class ChapterApi {
  private baseUrl = import.meta.env.VITE_BACKOFFICE_API_URL;

  public async index(params: GetChapterListParams): ReturnType<GetChapterListResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return ChapterMockApi.index(params, true);
    }
    return ApiClient.get<GetChapterListParams, GetChapterListResponse>(`${this.baseUrl}/chapters`, params);
  }

  public async create(params: CreateChapterParams): ReturnType<CreateChapterResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return ChapterMockApi.create(params, true);
    }
    return ApiClient.postJson<CreateChapterParams, CreateChapterResponse>(`${this.baseUrl}/chapters`, params);
  }

  public async show(params: GetChapterParams): ReturnType<GetChapterResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return ChapterMockApi.show(params, true);
    }
    return ApiClient.get<GetChapterParams, GetChapterResponse>(`${this.baseUrl}/chapters/${params.id}`, params);
  }

  public async update(params: UpdateChapterParams): ReturnType<UpdateChapterResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return ChapterMockApi.update(params, true);
    }
    return ApiClient.put<UpdateChapterParams, UpdateChapterResponse>(`${this.baseUrl}/chapters/${params.id}`, params);
  }

  public async delete(params: DeleteChapterParams): ReturnType<DeleteChapterResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return ChapterMockApi.delete(params, true);
    }
    return ApiClient.delete<DeleteChapterParams, DeleteChapterResponse>(`${this.baseUrl}/chapters/${params.id}`, params);
  }
}

export default new ChapterApi();
