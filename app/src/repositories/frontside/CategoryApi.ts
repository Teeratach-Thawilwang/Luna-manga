import { CategoryIndexParams, CategoryIndexResponse } from "@interfaces/frontside/CategoryInterface";
import CategoryMockApi from "@mocks/frontside/CategoryMockApi";
import ApiClient from "@repositories/ApiClient";

type ReturnType<T> = Promise<T>;

class CategoryApi {
  private baseUrl = import.meta.env.VITE_FRONT_SIDE_API_URL;

  public async index(params: CategoryIndexParams): ReturnType<CategoryIndexResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return CategoryMockApi.index(params, true);
    }
    return ApiClient.get<CategoryIndexParams, CategoryIndexResponse>(`${this.baseUrl}/categories`, params);
  }
}

export default new CategoryApi();
