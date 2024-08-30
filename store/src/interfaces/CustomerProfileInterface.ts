import { ImageInterface } from "@interfaces/ImageInterface";

// API Design
// getprofile [method get] : '/customer-profile'
// params CustomerProfileParams
// return CustomerProfileResponse

// updateProfile [method put] : '/customer-profile'
// params UpdateCustomerProfileParams
// return UpdateCustomerProfileResponse

// APIs Parameter Interface
export interface CustomerProfileParams {}

export interface UpdateCustomerProfileParams {
  first_name: string;
  last_name: string;
  nick_name: string;
  profile_image_id?: number;
}

// APIs Response Interface
export interface CustomerProfileResponse {
  id: number;
  first_name: string;
  last_name: string;
  nick_name: string;
  email: string;
  profile_image: ImageInterface[];
}

export interface UpdateCustomerProfileResponse {
  id: number;
  first_name: string;
  last_name: string;
  nick_name: string;
  email: string;
  profile_image: ImageInterface[];
}

// State Interface
export interface CustomerProfileSliceInterface {
  data: CustomerProfileInterface | null;
  is_loading: boolean;
  error: string;
}

// Model
export interface CustomerProfileInterface {
  [key: string]: any;
  id: number;
  first_name: string;
  last_name: string;
  nick_name: string;
  email: string;
  profile_image: ImageInterface[];
}
