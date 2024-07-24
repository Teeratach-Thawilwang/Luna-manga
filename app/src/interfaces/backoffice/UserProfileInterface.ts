import { PermissionListInterface } from "@interfaces/backoffice/PermissionInterface";
import { UpdateUserParams, UserInterface } from "@interfaces/backoffice/UserInterface";

// API Design
// getProfile [method get] : '/user-profile'
// params UserProfileParams
// return UserProfileResponse

// updateProfile [method put] : '/user-profile/<userId>'
// params UpdateUserProfileParams
// return UpdateUserProfileResponse

// APIs Parameter Interface
export interface UserProfileParams {}

export interface UpdateUserProfileParams extends UpdateUserParams {}

// APIs Response Interface
export interface UserProfileResponse extends UserProfileInterface {}

export interface UpdateUserProfileResponse extends UserProfileInterface {}

// State Interface
export interface UserProfileSliceInterface {
  data: UserProfileInterface | null;
  is_loading: boolean;
  error: string;
}

export interface UserProfileInterface extends UserInterface {
  permissions: PermissionListInterface[];
}
