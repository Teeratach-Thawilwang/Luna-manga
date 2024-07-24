import { CategoryTypeEnum } from "@enums/backoffice/CategoryTypeEnum";
import { CustomerReportGroupEnum } from "@enums/backoffice/CustomerReportGroupEnum";
import { CustomerReportSourceEnum } from "@enums/backoffice/CustomerReportSourceEnum";
import { PaginationInterface } from "@interfaces/backoffice/PaginationInterface";

// API Design
// customerReportList [method get] : '/customer-reports
// params GetCustomerReportListParams
// return GetCustomerReportListResponse

// customerReportShow [method get] : '/customer-reports/id
// params GetCustomerReportParams
// return GetCustomerReportResponse

// customerReportUpdate [method put] : '/customer-reports/id
// params UpdateCustomerReportParams
// return UpdateCustomerReportResponse

// APIs Parameter Interface
export interface GetCustomerReportListParams {
  q?: string;
  group?: CustomerReportGroupEnum;
  source?: CustomerReportSourceEnum;
  is_accept?: boolean;
  start_date?: string;
  end_date?: string;
  page: number;
  per_page: number;
  order_by: string;
}

export interface GetCustomerReportParams {
  id: number;
}

export interface UpdateCustomerReportParams {
  id: number;
  is_accept: boolean;
}

// APIs Response Interface
export interface GetCustomerReportListResponse {
  data: CustomerReportListInterface[];
  current: number;
  next: number | null;
  previous: number | null;
  last: number | null;
  total: number | null;
}

export interface GetCustomerReportResponse extends CustomerReportInterface {}

export interface UpdateCustomerReportResponse extends CustomerReportInterface {}

// State Interface
export interface CustomerReportListSliceInterface {
  data: CustomerReportListInterface[];
  paginate: PaginationInterface | null;
  filter: CustomerReportListFilterInterface | null;
  is_loading: boolean;
  error: string;
}

export interface CustomerReportSliceInterface {
  data: CustomerReportInterface | null;
  is_loading: boolean;
  error: string;
}

// Model
export interface CustomerReportListInterface {
  id: number;
  group: CustomerReportGroupEnum;
  source: CustomerReportSourceEnum;
  customer_id: number;
  is_accept: boolean;
  created_at: string;
  updated_at: string;
}

export interface CustomerReportListFilterInterface {
  q: string;
  group: CustomerReportGroupEnum;
  source: CustomerReportSourceEnum;
  is_accept: boolean;
  start_date: string;
  end_date: string;
  page: number;
  per_page: number;
  order_by: string;
}

export interface CustomerReportInterface {
  [key: string]: any;
  id: number;
  group: CustomerReportGroupEnum;
  source: CustomerReportSourceEnum;
  data: StoryDetailReportInterface | ChapterDetailReportInterface | PostDetailReportInterface | CommentDetailReportInterface;
  message: string;
  reporter: ReporterInterface;
  is_accept: boolean;
  accept_by: string;
  created_at: string;
  updated_at: string;
}

export interface ReporterInterface {
  id: number;
  email: string;
  nick_name: string;
  first_name: string;
  last_name: string;
  created_at: string;
  updated_at: string;
}

export interface StoryDetailReportInterface {
  id: number;
  slug: string;
  name: string;
  type: CategoryTypeEnum;
  created_at: string;
  updated_at: string;
}

export interface ChapterDetailReportInterface {
  id: number;
  name: string;
  chapter_number: number;
  story: StoryDetailReportInterface;
  created_at: string;
  updated_at: string;
}

export interface PostDetailReportInterface {
  id: number;
  commenter: CustomerDetailReportInterface;
  message: string;
  created_at: string;
  updated_at: string;
}

export interface CommentDetailReportInterface {
  id: number;
  chapter: ChapterDetailReportInterface;
  commenter: CustomerDetailReportInterface;
  message: string;
  created_at: string;
  updated_at: string;
}

export interface CustomerDetailReportInterface {
  id: number;
  email: string;
  nick_name: string;
  first_name: string;
  last_name: string;
  created_at: string;
  updated_at: string;
}
