import { CustomerGroupStatusEnum } from "@enums/backoffice/StatusEnum";
import { PaginationInterface } from "@interfaces/backoffice/PaginationInterface";

// API Design
// customerGroupList [method get] : '/customer-groups'
// params GetCustomerGroupListParams
// return GetCustomerGroupListResponse

// customerGroupCreate [method post] : '/customer-groups'
// params CreateCustomerGroupParams
// return CreateCustomerGroupResponse

// customerGroupShow [method get] : '/customer-groups/id'
// params GetCustomerGroupParams
// return GetCustomerGroupResponse

// customerGroupUpdate [method put] : '/customer-groups/id'
// params UpdateCustomerGroupParams
// return UpdateCustomerGroupResponse

// customerGroupDelete [method delete] : '/customer-groups/id'
// params DeleteCustomerGroupParams
// return DeleteCustomerGroupResponse

// APIs Parameter Interface
export interface GetCustomerGroupListParams {
  q?: string;
  status?: CustomerGroupStatusEnum;
  start_date?: string;
  end_date?: string;
  page: number;
  per_page: number;
  order_by: string;
}

export interface CreateCustomerGroupParams {
  name: string;
  status: CustomerGroupStatusEnum;
}

export interface GetCustomerGroupParams {
  id: number;
}

export interface UpdateCustomerGroupParams {
  id: number;
  name: string;
  status: CustomerGroupStatusEnum;
}

export interface DeleteCustomerGroupParams {
  id: number;
}

// APIs Response Interface
export interface GetCustomerGroupListResponse {
  data: CustomerGroupListInterface[];
  current: number;
  next: number | null;
  previous: number | null;
  last: number | null;
  total: number | null;
}

export interface CreateCustomerGroupResponse extends CustomerGroupInterface {}

export interface GetCustomerGroupResponse extends CustomerGroupInterface {}

export interface UpdateCustomerGroupResponse extends CustomerGroupInterface {}

export interface DeleteCustomerGroupResponse {}

// State Interface
export interface CustomerGroupListSliceInterface {
  data: CustomerGroupListInterface[];
  paginate: PaginationInterface | null;
  filter: CustomerGroupListFilterInterface | null;
  is_loading: boolean;
  error: string;
}

export interface CustomerGroupSliceInterface {
  data: CustomerGroupInterface | null;
  is_loading: boolean;
  error: string;
}

export interface CustomerGroupCreateEditSliceInterface {
  [key: string]: any;
  name: string | null;
  status: CustomerGroupStatusEnum | null;

  // validate message
  name_error_message: string;
}

// Model
export interface CustomerGroupListInterface {
  id: number;
  name: string;
  total_customer: number;
  status: CustomerGroupStatusEnum;
  created_at: string;
  updated_at: string;
}

export interface CustomerGroupListFilterInterface {
  q: string;
  status: CustomerGroupStatusEnum;
  start_date: string;
  end_date: string;
  page: number;
  per_page: number;
  order_by: string;
}

export interface CustomerGroupInterface {
  [key: string]: any;
  id: number;
  name: string;
  status: CustomerGroupStatusEnum;
  created_at: string;
  updated_at: string;
}
