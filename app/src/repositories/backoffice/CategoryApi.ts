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
// import CategoryMockApi from "@mocks/backoffice/CategoryMockApi";
import ApiClient from "@repositories/ApiClient";

type ReturnType<T> = Promise<T>;

class CategoryApi {
  private baseUrl = import.meta.env.VITE_BACKOFFICE_API_URL;

  private async getMockApi() {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      const module = await import("@mocks/backoffice/CategoryMockApi");
      return module.default;
    }
    return null;
  }

  public async index(params: GetCategoryListParams): ReturnType<GetCategoryListResponse> {
    const CategoryMockApi = await this.getMockApi();
    if (CategoryMockApi) {
      return CategoryMockApi.index(params, true);
    }
    return ApiClient.get<GetCategoryListParams, GetCategoryListResponse>(`${this.baseUrl}/categories`, params);
  }

  public async create(params: CreateCategoryParams): ReturnType<CreateCategoryResponse> {
    const CategoryMockApi = await this.getMockApi();
    if (CategoryMockApi) {
      return CategoryMockApi.create(params, true);
    }
    return ApiClient.postJson<CreateCategoryParams, CreateCategoryResponse>(`${this.baseUrl}/categories`, params);
  }

  public async show(params: GetCategoryParams): ReturnType<GetCategoryResponse> {
    const CategoryMockApi = await this.getMockApi();
    if (CategoryMockApi) {
      return CategoryMockApi.show(params, true);
    }
    return ApiClient.get<GetCategoryParams, GetCategoryResponse>(`${this.baseUrl}/categories/${params.id}`, params);
  }

  public async update(params: UpdateCategoryParams): ReturnType<UpdateCategoryResponse> {
    const CategoryMockApi = await this.getMockApi();
    if (CategoryMockApi) {
      return CategoryMockApi.update(params, true);
    }
    return ApiClient.put<UpdateCategoryParams, UpdateCategoryResponse>(`${this.baseUrl}/categories/${params.id}`, params);
  }

  public async delete(params: DeleteCategoryParams): ReturnType<DeleteCategoryResponse> {
    const CategoryMockApi = await this.getMockApi();
    if (CategoryMockApi) {
      return CategoryMockApi.delete(params, false);
    }
    return ApiClient.delete<DeleteCategoryParams, DeleteCategoryResponse>(`${this.baseUrl}/categories/${params.id}`, params);
  }
}

export default new CategoryApi();
