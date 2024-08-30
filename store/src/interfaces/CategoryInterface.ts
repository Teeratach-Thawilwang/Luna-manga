import { CategoryTypeEnum } from "@enums/CategoryTypeEnum";
import { ImageInterface } from "@interfaces/ImageInterface";
import { PaginationInterface } from "@interfaces/PaginationInterface";

// API Design
// index [method get] : '/categories'
// params CategoryIndexParams
// return CategoryIndexResponse

// APIs Parameter Interface
export interface CategoryIndexParams {
  page: number;
  per_page: number | string;
  order_by?: string;
}

// APIs Response Interface
export interface CategoryIndexResponse {
  data: CategoryInterface[];
  current: number;
  next: number | null;
  previous: number | null;
  last: number | null;
  total: number | null;
}

// State Interface
export interface CategorySliceInterface {
  data: CategoryInterface[];
  type: CategoryTypeEnum | null;
  paginate: PaginationInterface | null;
  is_loading: boolean;
  error: string;
}

// Model
export interface CategoryInterface {
  id: number;
  name: string;
  slug: string;
  type: CategoryTypeEnum;
  images?: ImageInterface[];
}
