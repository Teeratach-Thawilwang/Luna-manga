import { CategoryTypeEnum } from "@enums/backoffice/CategoryTypeEnum";
import { StoryStatusEnum } from "@enums/backoffice/StatusEnum";
import { CategoryListInterface } from "@interfaces/backoffice/CategoryInterface";
import { ImageInterface } from "@interfaces/backoffice/ImageInterface";
import { PaginationInterface } from "@interfaces/backoffice/PaginationInterface";

// API Design
// storyList [method get] : '/stories'
// params GetStoryListParams
// return GetStoryListResponse

// storyCreate [method post] : '/stories'
// params CreateStoryParams
// return CreateStoryResponse

// storyShow [method get] : '/stories/id'
// params GetStoryParams
// return GetStoryResponse

// storyUpdate [method put] : '/stories/id'
// params UpdateStoryParams
// return UpdateStoryResponse

// storyDelete [method delete] : '/stories/id'
// params DeleteStoryParams
// return DeleteStoryResponse

// APIs Parameter Interface
export interface GetStoryListParams {
  q?: string;
  status?: StoryStatusEnum;
  start_date?: string;
  end_date?: string;
  type?: CategoryTypeEnum;
  page: number;
  per_page: number;
  order_by: string;
}

export interface CreateStoryParams {
  name: string;
  slug: string;
  type: CategoryTypeEnum;
  description: string;
  status: StoryStatusEnum;
  category_ids: number[];
  cover_image_id: number;
}

export interface GetStoryParams {
  id: number;
}

export interface UpdateStoryParams {
  id: number;
  name: string;
  slug: string;
  type: CategoryTypeEnum;
  description: string;
  status: StoryStatusEnum;
  category_ids: number[];
  cover_image_id: number;
}

export interface DeleteStoryParams {
  id: number;
}

// APIs Response Interface
export interface GetStoryListResponse {
  data: StoryListInterface[];
  current: number;
  next: number | null;
  previous: number | null;
  last: number | null;
  total: number | null;
}

export interface CreateStoryResponse extends StoryInterface {}

export interface GetStoryResponse extends StoryInterface {}

export interface UpdateStoryResponse extends StoryInterface {}

export interface DeleteStoryResponse {}

// State Interface
export interface StoryListSliceInterface {
  data: StoryListInterface[];
  paginate: PaginationInterface | null;
  filter: StoryListFilterInterface | null;
  is_loading: boolean;
  error: string;
}

export interface StorySliceInterface {
  data: StoryInterface | null;
  is_loading: boolean;
  error: string;
}

export interface StoryCreateEditSliceInterface {
  [key: string]: any;
  name: string | null;
  slug: string | null;
  type: CategoryTypeEnum | null;
  description: string | null;
  status: StoryStatusEnum | null;
  categories: CategoryListInterface[];
  cover_image: File | ImageInterface | null;

  // validate message
  name_error_message: string;
  slug_error_message: string;
  description_error_message: string;
  categories_error_message: string;
  cover_image_error_message: string;
}

// Model
export interface StoryListInterface {
  id: number;
  name: string;
  type: CategoryTypeEnum;
  status: StoryStatusEnum;
  author_name: string;
  total_chapter: number;
  rating_score: number;
  created_at: string;
  updated_at: string;
}

export interface StoryListFilterInterface {
  q: string;
  status: StoryStatusEnum;
  start_date: string;
  end_date: string;
  page: number;
  per_page: number;
  order_by: string;
}

export interface StoryInterface {
  [key: string]: any;
  id: number;
  name: string;
  slug: string;
  type: CategoryTypeEnum;
  description: string;
  status: StoryStatusEnum;
  categories: CategoryListInterface[];
  cover_image: ImageInterface[];
  created_at: string;
  updated_at: string;
}
