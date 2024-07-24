import { CategoryStatusEnum } from "@enums/backoffice/StatusEnum";
import { CategoryTypeEnum } from "@enums/frontside/CategoryTypeEnum";
import { ImageInterface } from "@interfaces/backoffice/ImageInterface";
import { PaginationInterface } from "@interfaces/backoffice/PaginationInterface";

// API Design
// categoryList [method get] : '/categories'
// params GetCategoryListParams
// return GetCategoryListResponse

// categoryCreate [method post] : '/categories'
// params CreateCategoryParams
// return CreateCategoryResponse

// categoryShow [method get] : '/categories/id'
// params GetCategoryParams
// return GetCategoryResponse

// categoryUpdate [method put] : '/categories/id'
// params UpdateCategoryParams
// return UpdateCategoryResponse

// categoryDelete [method delete] : '/categories/id'
// params DeleteCategoryParams
// return DeleteCategoryResponse

// APIs Parameter Interface
export interface GetCategoryListParams {
  q?: string;
  status?: CategoryStatusEnum;
  type?: CategoryTypeEnum;
  start_date?: string;
  end_date?: string;
  page: number;
  per_page: number;
  order_by: string;
}

export interface CreateCategoryParams {
  name: string;
  type: CategoryTypeEnum;
  status: CategoryStatusEnum;
  image_id?: number;
}

export interface GetCategoryParams {
  id: number;
}

export interface UpdateCategoryParams {
  id: number;
  name: string;
  type: CategoryTypeEnum;
  status: CategoryStatusEnum;
  image_id?: number;
}
export interface DeleteCategoryParams {
  id: number;
}

// APIs Response Interface
export interface GetCategoryListResponse {
  data: CategoryListInterface[];
  current: number;
  next: number | null;
  previous: number | null;
  last: number | null;
  total: number | null;
}

export interface CreateCategoryResponse extends CategoryInterface {}

export interface GetCategoryResponse extends CategoryInterface {}

export interface UpdateCategoryResponse extends CategoryInterface {}

export interface DeleteCategoryResponse {}

// State Interface
export interface CategoryListSliceInterface {
  data: CategoryListInterface[];
  paginate: PaginationInterface | null;
  filter: CategoryListFilterInterface | null;
  is_loading: boolean;
  error: string;
}

export interface CategorySliceInterface {
  data: CategoryInterface | null;
  is_loading: boolean;
  error: string;
}

export interface CategoryCreateEditSliceInterface {
  [key: string]: any;
  name: string | null;
  type: CategoryTypeEnum | null;
  status: CategoryStatusEnum | null;
  image: File | ImageInterface | null;

  // validate message
  name_error_message: string;
  type_error_message: string;
  image_error_message: string;
}

// Model
export interface CategoryListInterface {
  id: number;
  name: string;
  total_story: number;
  type: CategoryTypeEnum;
  status: CategoryStatusEnum;
  created_at: string;
  updated_at: string;
}

export interface CategoryListFilterInterface {
  q: string;
  status: CategoryStatusEnum;
  type: CategoryTypeEnum;
  start_date: string;
  end_date: string;
  page: number;
  per_page: number;
  order_by: string;
}

export interface CategoryInterface {
  [key: string]: any;
  id: number;
  name: string;
  type: CategoryTypeEnum;
  status: CategoryStatusEnum;
  images: ImageInterface[];
  created_at: string;
  updated_at: string;
}
