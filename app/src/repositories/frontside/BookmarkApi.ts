import {
  BookmarkAddParams,
  BookmarkAddResponse,
  BookmarkDeleteParams,
  BookmarkDeleteResponse,
  BookmarkIndexParams,
  BookmarkIndexResponse,
} from "@interfaces/frontside/BookmarkInterface";
// import BookmarkMockApi from "@mocks/frontside/BookmarkMockApi";
import ApiClient from "@repositories/ApiClient";

type ReturnType<T> = Promise<T>;

class BookmarkApi {
  private baseUrl = import.meta.env.VITE_FRONT_SIDE_API_URL;

  private async getMockApi() {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      const module = await import("@mocks/frontside/BookmarkMockApi");
      return module.default;
    }
    return null;
  }

  public async index(params: BookmarkIndexParams): ReturnType<BookmarkIndexResponse> {
    const BookmarkMockApi = await this.getMockApi();
    if (BookmarkMockApi) {
      return BookmarkMockApi.index(params, true);
    }
    return ApiClient.get<BookmarkIndexParams, BookmarkIndexResponse>(`${this.baseUrl}/bookmarks`, params);
  }

  public async addBookmark(params: BookmarkAddParams): ReturnType<BookmarkAddResponse> {
    const BookmarkMockApi = await this.getMockApi();
    if (BookmarkMockApi) {
      return BookmarkMockApi.addBookmark(params, true);
    }
    return ApiClient.postJson<BookmarkAddParams, BookmarkAddResponse>(`${this.baseUrl}/bookmarks`, params);
  }

  public async deleteBookmark(params: BookmarkDeleteParams): ReturnType<BookmarkDeleteResponse> {
    const BookmarkMockApi = await this.getMockApi();
    if (BookmarkMockApi) {
      return BookmarkMockApi.deleteBookmark(params, true);
    }
    return ApiClient.delete<BookmarkDeleteParams, BookmarkDeleteResponse>(`${this.baseUrl}/bookmarks`, params);
  }
}

export default new BookmarkApi();
