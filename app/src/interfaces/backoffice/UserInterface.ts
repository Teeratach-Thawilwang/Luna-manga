import { UserStatusEnum } from "@enums/backoffice/StatusEnum";
import { PaginationInterface } from "@interfaces/backoffice/PaginationInterface";

// API Design
// userList [method get] : '/users'
// params GetUserListParams
// return GetUserListResponse

// userGroupCreate [method post] : '/users'
// params CreateUserParams
// return CreateUserResponse

// userGroupShow [method get] : '/users/id'
// params GetUserParams
// return GetUserResponse

// userGroupUpdate [method put] : '/users/id'
// params UpdateUserParams
// return UpdateUserResponse

// APIs Parameter Interface
export interface GetUserListParams {
  q?: string;
  status?: UserStatusEnum;
  start_date?: string;
  end_date?: string;
  page: number;
  per_page: number;
  order_by: string;
}

export interface CreateUserParams {
  email: string;
  password: string;
  nick_name: string;
  first_name: string;
  last_name: string;
  status: UserStatusEnum;
}

export interface GetUserParams {
  id: number;
}

export interface UpdateUserParams {
  id: number;
  email: string;
  password?: string;
  nick_name: string;
  first_name: string;
  last_name: string;
  status: UserStatusEnum;
}

// APIs Response Interface
export interface GetUserListResponse {
  data: UserListInterface[];
  current: number;
  next: number | null;
  previous: number | null;
  last: number | null;
  total: number | null;
}

export interface CreateUserResponse extends UserInterface {}

export interface GetUserResponse extends UserInterface {}

export interface UpdateUserResponse extends UserInterface {}

// State Interface
export interface UserListSliceInterface {
  data: UserListInterface[];
  paginate: PaginationInterface | null;
  filter: UserListFilterInterface | null;
  is_loading: boolean;
  error: string;
}

export interface UserSliceInterface {
  data: UserInterface | null;
  is_loading: boolean;
  error: string;
}

export interface UserCreateEditSliceInterface {
  [key: string]: any;
  email: string | null;
  password: string | null;
  nick_name: string | null;
  first_name: string | null;
  last_name: string | null;
  status: UserStatusEnum | null;

  // validate message
  email_error_message: string;
  password_error_message: string;
  nick_name_error_message: string;
  first_name_error_message: string;
  last_name_error_message: string;
}

// Model
export interface UserListInterface {
  id: number;
  email: string;
  nick_name: string;
  first_name: string;
  last_name: string;
  status: UserStatusEnum;
  created_at: string;
  updated_at: string;
}

export interface UserListFilterInterface {
  q: string;
  status: UserStatusEnum;
  start_date: string;
  end_date: string;
  page: number;
  per_page: number;
  order_by: string;
}

export interface UserInterface {
  [key: string]: any;
  id: number;
  email: string;
  nick_name: string;
  first_name: string;
  last_name: string;
  status: UserStatusEnum;
  created_at: string;
  updated_at: string;
}
