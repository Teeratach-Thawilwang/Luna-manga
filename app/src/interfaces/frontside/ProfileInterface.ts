import { ImageInterface } from "@interfaces/frontside/ImageInterface";

// API Design
// getProfile [method get] : '/profile/<customerId>'
// params ProfileParams
// return ProfileResponse

// APIs Parameter Interface
export interface ProfileParams {
  id: number;
}

// APIs Response Interface
export interface ProfileResponse extends ProfileInterface {}

// State Interface
export interface ProfileSliceInterface {
  data: ProfileInterface | null;
  is_loading: boolean;
  error: string;
}

// Model
export interface ProfileInterface {
  [key: string]: any;
  id: number;
  first_name: string;
  last_name: string;
  nick_name: string;
  email: string;
  profile_images: ImageInterface[];
}
