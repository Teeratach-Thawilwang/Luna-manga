import { CategoryTypeEnum } from "@enums/CategoryTypeEnum";
import { CategoryInterface } from "@interfaces/CategoryInterface";
import { ImageInterface } from "@interfaces/ImageInterface";
import { PaginationInterface } from "@interfaces/PaginationInterface";

// API Design
// index [method get] : '/bookmarks'
// params BookmarkIndexParams
// return BookmarkIndexResponse

// addBookmark [method post] : '/bookmarks'
// params BookmarkAddParams
// return BookmarkAddResponse : 200 ok

// deleteBookmark [method delete] : '/bookmarks'
// params BookmarkDeleteParams
// return BookmarkDeleteResponse : 200 ok

// APIs Parameter Interface
export interface BookmarkIndexParams {
  page: number;
  per_page: number | string;
  order_by?: string;
}

export interface BookmarkAddParams {
  story_id: number;
  customer_id: number;
}

export interface BookmarkDeleteParams {
  story_id: number;
  customer_id: number;
}

// APIs Response Interface
export interface BookmarkIndexResponse {
  data: BookmarkStoryInterface[];
  current: number;
  next: number | null;
  previous: number | null;
  last: number | null;
  total: number | null;
}

export interface BookmarkAddResponse {}

export interface BookmarkDeleteResponse {}

// State Interface
export interface BookmarkSliceInterface {
  data: BookmarkStoryInterface[];
  paginate: PaginationInterface | null;
  is_loading: boolean;
  error: string;
}

// Model
export interface BookmarkStoryInterface {
  [key: string]: any;
  id: number;
  slug: string;
  name: string;
  type: CategoryTypeEnum;
  author: BookmarkStoryAuthor;
  rating_score: number;
  view_count: number;
  images: ImageInterface[];
  categories: CategoryInterface[];
}

export interface BookmarkStoryAuthor {
  id: number;
  display_name: string; // if nickName is null, it's full name.
}
