// API Design
// permissionList [method get] : '/permissions'
// params GetPermissionListParams
// return GetPermissionListResponse

// APIs Parameter Interface
export interface GetPermissionListParams {}

// APIs Response Interface
export interface GetPermissionListResponse {
  data: PermissionListInterface[];
}

// State Interface
export interface PermissionListSliceInterface {
  data: PermissionListInterface[];
  is_loading: boolean;
  error: string;
}

// Model
export interface PermissionListInterface {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}
