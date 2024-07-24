import { CategoryStoryIndexParams, CategoryStoryIndexResponse } from "@interfaces/frontside/CategoryStoryInterface";
import CategoryStoryMockApi from "@mocks/frontside/CategoryStoryMockApi";
import ApiClient from "@repositories/ApiClient";

type ReturnType<T> = Promise<T>;

class CategoryStory {
  private baseUrl = import.meta.env.VITE_FRONT_SIDE_API_URL;

  public async index(params: CategoryStoryIndexParams): ReturnType<CategoryStoryIndexResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return CategoryStoryMockApi.index(params, true);
    }
    return ApiClient.get<CategoryStoryIndexParams, CategoryStoryIndexResponse>(`${this.baseUrl}/category-stories/${params.id}`, params);
  }
}

export default new CategoryStory();
