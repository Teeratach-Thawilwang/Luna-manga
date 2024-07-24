import {
  CreateCategoryParams,
  CreateCategoryResponse,
  DeleteCategoryParams,
  DeleteCategoryResponse,
  GetCategoryListParams,
  GetCategoryListResponse,
  GetCategoryParams,
  GetCategoryResponse,
  UpdateCategoryParams,
  UpdateCategoryResponse,
} from "@interfaces/backoffice/CategoryInterface";
import CategoryMockApi from "@mocks/backoffice/CategoryMockApi";
import ApiClient from "@repositories/ApiClient";

type ReturnType<T> = Promise<T>;

class CategoryApi {
  private baseUrl = import.meta.env.VITE_BACKOFFICE_API_URL;

  public async index(params: GetCategoryListParams): ReturnType<GetCategoryListResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return CategoryMockApi.index(params, true);
    }
    return ApiClient.get<GetCategoryListParams, GetCategoryListResponse>(`${this.baseUrl}/categories`, params);
  }

  public async create(params: CreateCategoryParams): ReturnType<CreateCategoryResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return CategoryMockApi.create(params, true);
    }
    return ApiClient.postJson<CreateCategoryParams, CreateCategoryResponse>(`${this.baseUrl}/categories`, params);
  }

  public async show(params: GetCategoryParams): ReturnType<GetCategoryResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return CategoryMockApi.show(params, true);
    }
    return ApiClient.get<GetCategoryParams, GetCategoryResponse>(`${this.baseUrl}/categories/${params.id}`, params);
  }

  public async update(params: UpdateCategoryParams): ReturnType<UpdateCategoryResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return CategoryMockApi.update(params, true);
    }
    return ApiClient.put<UpdateCategoryParams, UpdateCategoryResponse>(`${this.baseUrl}/categories/${params.id}`, params);
  }

  public async delete(params: DeleteCategoryParams): ReturnType<DeleteCategoryResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return CategoryMockApi.delete(params, false);
    }
    return ApiClient.delete<DeleteCategoryParams, DeleteCategoryResponse>(`${this.baseUrl}/categories/${params.id}`, params);
  }
}

export default new CategoryApi();
