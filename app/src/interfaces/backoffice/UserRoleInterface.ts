import { PaginationInterface } from "@interfaces/backoffice/PaginationInterface";
import { PermissionListInterface } from "@interfaces/backoffice/PermissionInterface";
import { UserListInterface } from "@interfaces/backoffice/UserInterface";

// API Design
// userRoleList [method get] : '/roles'
// params GetUserRoleListParams
// return GetUserRoleListResponse

// userRoleCreate [method post] : '/roles'
// params CreateUserRoleParams
// return CreateUserRoleResponse

// userRoleShow [method get] : '/roles/id'
// params GetUserRoleParams
// return GetUserRoleResponse

// userRoleUpdate [method put] : '/roles/id'
// params UpdateUserRoleParams
// return UpdateUserRoleResponse

// userRoleDelete [method delete] : '/roles/id'
// params DeleteUserRoleParams
// return DeleteUserRoleResponse

// APIs Parameter Interface
export interface GetUserRoleListParams {
  page: number;
  per_page: number;
  order_by: string;
}

export interface CreateUserRoleParams {
  name: string;
  description: string;
  permission_ids: number[];
  user_ids: number[];
}

export interface GetUserRoleParams {
  id: number;
}

export interface UpdateUserRoleParams {
  id: number;
  name: string;
  description: string;
  permission_ids: number[];
  user_ids: number[];
}

export interface DeleteUserRoleParams {
  id: number;
}

// APIs Response Interface
export interface GetUserRoleListResponse {
  data: UserRoleListInterface[];
  current: number;
  next: number | null;
  previous: number | null;
  last: number | null;
  total: number | null;
}

export interface CreateUserRoleResponse extends UserRoleInterface {}

export interface GetUserRoleResponse extends UserRoleInterface {}

export interface UpdateUserRoleResponse extends UserRoleInterface {}

export interface DeleteUserRoleResponse {}

// State Interface
export interface UserRoleListSliceInterface {
  data: UserRoleListInterface[];
  paginate: PaginationInterface | null;
  is_loading: boolean;
  error: string;
}

export interface UserRoleSliceInterface {
  data: UserRoleInterface | null;
  is_loading: boolean;
  error: string;
}

export interface UserRoleCreateEditSliceInterface {
  [key: string]: any;
  name: string | null;
  description: string | null;
  permissions: PermissionListInterface[];
  users: UserListInterface[];

  // validate message
  name_error_message: string;
  description_error_message: string;
  permissions_error_message: string;
}

// Model
export interface UserRoleListInterface {
  id: number;
  name: string;
  description: string;
  total_user: number;
  created_at: string;
  updated_at: string;
}

export interface UserRoleInterface {
  [key: string]: any;
  id: number;
  name: string;
  description: string;
  permissions: PermissionListInterface[];
  users: UserListInterface[];
  created_at: string;
  updated_at: string;
}
