import { CategoryTypeEnum } from "@enums/CategoryTypeEnum";
// import { ContentRateEnum } from "@enums/ContentRateEnum";
import { ImageInterface } from "@interfaces/ImageInterface";
import { PaginationInterface } from "@interfaces/PaginationInterface";

// API Design
// index [method get] : '/category-stories/<category_id>'
// params CategoryStoryIndexParams
// return CategoryStoryIndexResponse

// APIs Parameter Interface
export interface CategoryStoryIndexParams {
  id: number;
  page: number;
  per_page: number;
  order_by?: string;
}

// APIs Response Interface
export interface CategoryStoryIndexResponse {
  data: CategoryStoryInterface[];
  current: number;
  next: number | null;
  previous: number | null;
  last: number | null;
  total: number | null;
}

// State Interface
export interface CategoryStorySliceInterface {
  data: CategoryStoryInterface[];
  category_selected_id: number | null;
  paginate: PaginationInterface | null;
  is_loading: boolean;
  error: string;
}

// Model
export interface CategoryStoryInterface {
  id: number;
  slug: string;
  name: string;
  type: CategoryTypeEnum;
  // content_rate: ContentRateEnum;
  author: CategoryStoryAuthor;
  rating_score: number;
  view_count: number;
  images: ImageInterface[];
}

export interface CategoryStoryAuthor {
  id: number;
  display_name: string; // if nickName is null, it's full name.
}
