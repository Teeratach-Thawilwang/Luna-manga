import {
  CreateStoryParams,
  CreateStoryResponse,
  DeleteStoryParams,
  DeleteStoryResponse,
  GetStoryListParams,
  GetStoryListResponse,
  GetStoryParams,
  GetStoryResponse,
  UpdateStoryParams,
  UpdateStoryResponse,
} from "@interfaces/backoffice/StoryInterface";
import ApiClient from "@repositories/ApiClient";

type ReturnType<T> = Promise<T>;

class StoryApi {
  private baseUrl = import.meta.env.VITE_BACKOFFICE_API_URL;

  private async getMockApi() {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      const module = await import("@mocks/backoffice/StoryMockApi");
      return module.default;
    }
    return null;
  }

  public async index(params: GetStoryListParams): ReturnType<GetStoryListResponse> {
    const StoryMockApi = await this.getMockApi();
    if (StoryMockApi) {
      return StoryMockApi.index(params, true);
    }
    return ApiClient.get<GetStoryListParams, GetStoryListResponse>(`${this.baseUrl}/stories`, params);
  }

  public async create(params: CreateStoryParams): ReturnType<CreateStoryResponse> {
    const StoryMockApi = await this.getMockApi();
    if (StoryMockApi) {
      return StoryMockApi.create(params, true);
    }
    return ApiClient.postJson<CreateStoryParams, CreateStoryResponse>(`${this.baseUrl}/stories`, params);
  }

  public async show(params: GetStoryParams): ReturnType<GetStoryResponse> {
    const StoryMockApi = await this.getMockApi();
    if (StoryMockApi) {
      return StoryMockApi.show(params, true);
    }
    return ApiClient.get<GetStoryParams, GetStoryResponse>(`${this.baseUrl}/stories/${params.id}`, params);
  }

  public async update(params: UpdateStoryParams): ReturnType<UpdateStoryResponse> {
    const StoryMockApi = await this.getMockApi();
    if (StoryMockApi) {
      return StoryMockApi.update(params, true);
    }
    return ApiClient.put<UpdateStoryParams, UpdateStoryResponse>(`${this.baseUrl}/stories/${params.id}`, params);
  }

  public async delete(params: DeleteStoryParams): ReturnType<DeleteStoryResponse> {
    const StoryMockApi = await this.getMockApi();
    if (StoryMockApi) {
      return StoryMockApi.delete(params, true);
    }
    return ApiClient.delete<DeleteStoryParams, DeleteStoryResponse>(`${this.baseUrl}/stories/${params.id}`, params);
  }
}

export default new StoryApi();
