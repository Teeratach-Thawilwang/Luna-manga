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
import StoryMockApi from "@mocks/backoffice/StoryMockApi";
import ApiClient from "@repositories/ApiClient";

type ReturnType<T> = Promise<T>;

class StoryApi {
  private baseUrl = import.meta.env.VITE_BACKOFFICE_API_URL;

  public async index(params: GetStoryListParams): ReturnType<GetStoryListResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return StoryMockApi.index(params, true);
    }
    return ApiClient.get<GetStoryListParams, GetStoryListResponse>(`${this.baseUrl}/stories`, params);
  }

  public async create(params: CreateStoryParams): ReturnType<CreateStoryResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return StoryMockApi.create(params, true);
    }
    return ApiClient.postJson<CreateStoryParams, CreateStoryResponse>(`${this.baseUrl}/stories`, params);
  }

  public async show(params: GetStoryParams): ReturnType<GetStoryResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return StoryMockApi.show(params, true);
    }
    return ApiClient.get<GetStoryParams, GetStoryResponse>(`${this.baseUrl}/stories/${params.id}`, params);
  }

  public async update(params: UpdateStoryParams): ReturnType<UpdateStoryResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return StoryMockApi.update(params, true);
    }
    return ApiClient.put<UpdateStoryParams, UpdateStoryResponse>(`${this.baseUrl}/stories/${params.id}`, params);
  }

  public async delete(params: DeleteStoryParams): ReturnType<DeleteStoryResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return StoryMockApi.delete(params, true);
    }
    return ApiClient.delete<DeleteStoryParams, DeleteStoryResponse>(`${this.baseUrl}/stories/${params.id}`, params);
  }
}

export default new StoryApi();
