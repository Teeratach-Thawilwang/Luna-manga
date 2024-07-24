import {
  BookmarkAddParams,
  BookmarkAddResponse,
  BookmarkDeleteParams,
  BookmarkDeleteResponse,
  BookmarkIndexParams,
  BookmarkIndexResponse,
} from "@interfaces/frontside/BookmarkInterface";
import BookmarkMockApi from "@mocks/frontside/BookmarkMockApi";
import ApiClient from "@repositories/ApiClient";

type ReturnType<T> = Promise<T>;

class BookmarkApi {
  private baseUrl = import.meta.env.VITE_FRONT_SIDE_API_URL;

  public async index(params: BookmarkIndexParams): ReturnType<BookmarkIndexResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return BookmarkMockApi.index(params, true);
    }
    return ApiClient.get<BookmarkIndexParams, BookmarkIndexResponse>(`${this.baseUrl}/bookmarks`, params);
  }

  public async addBookmark(params: BookmarkAddParams): ReturnType<BookmarkAddResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return BookmarkMockApi.addBookmark(params, true);
    }
    return ApiClient.postJson<BookmarkAddParams, BookmarkAddResponse>(`${this.baseUrl}/bookmarks`, params);
  }

  public async deleteBookmark(params: BookmarkDeleteParams): ReturnType<BookmarkDeleteResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return BookmarkMockApi.deleteBookmark(params, true);
    }
    return ApiClient.delete<BookmarkDeleteParams, BookmarkDeleteResponse>(`${this.baseUrl}/bookmarks`, params);
  }
}

export default new BookmarkApi();
