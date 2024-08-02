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
import ApiClient from "@repositories/ApiClient";

type ReturnType<T> = Promise<T>;

class ChapterApi {
  private baseUrl = import.meta.env.VITE_BACKOFFICE_API_URL;

  private async getMockApi() {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      const module = await import("@mocks/backoffice/ChapterMockApi");
      return module.default;
    }
    return null;
  }

  public async index(params: GetChapterListParams): ReturnType<GetChapterListResponse> {
    const ChapterMockApi = await this.getMockApi();
    if (ChapterMockApi) {
      return ChapterMockApi.index(params, true);
    }
    return ApiClient.get<GetChapterListParams, GetChapterListResponse>(`${this.baseUrl}/chapters`, params);
  }

  public async create(params: CreateChapterParams): ReturnType<CreateChapterResponse> {
    const ChapterMockApi = await this.getMockApi();
    if (ChapterMockApi) {
      return ChapterMockApi.create(params, true);
    }
    return ApiClient.postJson<CreateChapterParams, CreateChapterResponse>(`${this.baseUrl}/chapters`, params);
  }

  public async show(params: GetChapterParams): ReturnType<GetChapterResponse> {
    const ChapterMockApi = await this.getMockApi();
    if (ChapterMockApi) {
      return ChapterMockApi.show(params, true);
    }
    return ApiClient.get<GetChapterParams, GetChapterResponse>(`${this.baseUrl}/chapters/${params.id}`, params);
  }

  public async update(params: UpdateChapterParams): ReturnType<UpdateChapterResponse> {
    const ChapterMockApi = await this.getMockApi();
    if (ChapterMockApi) {
      return ChapterMockApi.update(params, true);
    }
    return ApiClient.put<UpdateChapterParams, UpdateChapterResponse>(`${this.baseUrl}/chapters/${params.id}`, params);
  }

  public async delete(params: DeleteChapterParams): ReturnType<DeleteChapterResponse> {
    const ChapterMockApi = await this.getMockApi();
    if (ChapterMockApi) {
      return ChapterMockApi.delete(params, true);
    }
    return ApiClient.delete<DeleteChapterParams, DeleteChapterResponse>(`${this.baseUrl}/chapters/${params.id}`, params);
  }
}

export default new ChapterApi();
