import { CategoryStoryIndexParams, CategoryStoryIndexResponse } from "@interfaces/CategoryStoryInterface";
import ApiClient from "@repositories/ApiClient";

type ReturnType<T> = Promise<T>;

class CategoryStory {
  private baseUrl = import.meta.env.VITE_FRONT_SIDE_API_URL;

  private async getMockApi() {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      const module = await import("@mocks/CategoryStoryMockApi");
      return module.default;
    }
    return null;
  }

  public async index(params: CategoryStoryIndexParams): ReturnType<CategoryStoryIndexResponse> {
    const CategoryStoryMockApi = await this.getMockApi();
    if (CategoryStoryMockApi) {
      return CategoryStoryMockApi.index(params, true);
    }
    return ApiClient.get<CategoryStoryIndexParams, CategoryStoryIndexResponse>(`${this.baseUrl}/category-stories/${params.id}`, params);
  }
}

export default new CategoryStory();
