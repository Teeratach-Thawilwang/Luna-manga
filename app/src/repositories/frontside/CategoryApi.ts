import { CategoryIndexParams, CategoryIndexResponse } from "@interfaces/frontside/CategoryInterface";
// import CategoryMockApi from "@mocks/frontside/CategoryMockApi";
import ApiClient from "@repositories/ApiClient";

type ReturnType<T> = Promise<T>;

class CategoryApi {
  private baseUrl = import.meta.env.VITE_FRONT_SIDE_API_URL;

  private async getMockApi() {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      const module = await import("@mocks/frontside/CategoryMockApi");
      return module.default;
    }
    return null;
  }

  public async index(params: CategoryIndexParams): ReturnType<CategoryIndexResponse> {
    const CategoryMockApi = await this.getMockApi();
    if (CategoryMockApi) {
      return CategoryMockApi.index(params, true);
    }
    return ApiClient.get<CategoryIndexParams, CategoryIndexResponse>(`${this.baseUrl}/categories`, params);
  }
}

export default new CategoryApi();
