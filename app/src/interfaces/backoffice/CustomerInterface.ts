import { CustomerStatusEnum } from "@enums/backoffice/StatusEnum";
import { CustomerGroupListInterface } from "@interfaces/backoffice/CustomerGroupInterface";
import { ImageInterface } from "@interfaces/backoffice/ImageInterface";
import { PaginationInterface } from "@interfaces/backoffice/PaginationInterface";

// API Design
// customerList [method get] : '/customers'
// params GetCustomerListParams
// return GetCustomerListResponse

// customerShow [method get] : '/customers/id'
// params GetCustomerParams
// return GetCustomerResponse

// customerUpdate [method put] : '/customers/id'
// params UpdateCustomerParams
// return UpdateCustomerResponse

// APIs Parameter Interface
export interface GetCustomerListParams {
  q?: string;
  status?: CustomerStatusEnum;
  start_date?: string;
  end_date?: string;
  page: number;
  per_page: number;
  order_by: string;
}

export interface GetCustomerParams {
  id: number;
}

export interface UpdateCustomerParams {
  id: number;
  email: string;
  nick_name: string;
  first_name: string;
  last_name: string;
  status: CustomerStatusEnum;
  profile_image_id: number;
  customer_group_id: number;
}

// APIs Response Interface
export interface GetCustomerListResponse {
  data: CustomerListInterface[];
  current: number;
  next: number | null;
  previous: number | null;
  last: number | null;
  total: number | null;
}

export interface GetCustomerResponse extends CustomerInterface {}

export interface UpdateCustomerResponse extends CustomerInterface {}

// State Interface
export interface CustomerListSliceInterface {
  data: CustomerListInterface[];
  paginate: PaginationInterface | null;
  filter: CustomerListFilterInterface | null;
  is_loading: boolean;
  error: string;
}

export interface CustomerSliceInterface {
  data: CustomerInterface | null;
  is_loading: boolean;
  error: string;
}

export interface CustomerEditSliceInterface {
  [key: string]: any;
  email: string | null;
  nick_name: string | null;
  first_name: string | null;
  last_name: string | null;
  status: CustomerStatusEnum | null;
  profile_image: File | ImageInterface | null;
  customer_group: CustomerGroupListInterface | null;

  // validate message
  email_error_message: string;
  nick_name_error_message: string;
  first_name_error_message: string;
  last_name_error_message: string;
  profile_image_error_message: string;
  customer_group_error_message: string;
}

// Model
export interface CustomerListInterface {
  id: number;
  email: string;
  nick_name: string;
  first_name: string;
  last_name: string;
  total_story: number;
  status: CustomerStatusEnum;
  created_at: string;
  updated_at: string;
}

export interface CustomerListFilterInterface {
  q: string;
  status: CustomerStatusEnum;
  start_date: string;
  end_date: string;
  page: number;
  per_page: number;
  order_by: string;
}

export interface CustomerInterface {
  [key: string]: any;
  id: number;
  email: string;
  nick_name: string;
  first_name: string;
  last_name: string;
  total_story: number;
  status: CustomerStatusEnum;
  profile_image: ImageInterface[];
  customer_group: CustomerGroupListInterface;
  created_at: string;
  updated_at: string;
}
