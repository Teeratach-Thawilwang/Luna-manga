import { CommentInterface, CommentReactionInterface } from "@interfaces/frontside/CommentInterface";
import { PaginationInterface } from "@interfaces/frontside/PaginationInterface";

// API Design
// getPost [method get] : '/posts'
// params ProfilePostParams
// return ProfilePostResponse

// createPost [method post] : '/posts'
// params CreateProfilePostParams
// return CreateProfilePostResponse

// deletePost [method delete] : '/posts/<post_id>'
// params DeletePostParams
// return DeletePostResponse

// profilePostReaction [method put] : '/post-reaction/<post_id>'
// params ProfilePostReactionParams
// return ProfilePostReactionResponse

// APIs Parameter Interface
export interface ProfilePostParams {
  customer_id: number;
  page: number;
  per_page: number;
  order_by?: string;
}

export interface CreateProfilePostParams {
  customer_id: number;
  message: string;
}

export interface DeletePostParams {
  customer_id: number;
  post_id: number;
}

export interface ProfilePostReactionParams {
  customer_id: number;
  post_id: number;
  like?: number;
  dislike?: number;
}

// APIs Response Interface
export interface ProfilePostResponse {
  data: ProfilePostInterface[];
  current: number;
  next: number | null;
  previous: number | null;
  last: number | null;
  total: number | null;
}

export interface CreateProfilePostResponse extends ProfilePostInterface {}

export interface DeletePostResponse {}

export interface ProfilePostReactionResponse extends CommentReactionInterface {}

// State Interface
export interface ProfilePostSliceInterface {
  data: ProfilePostInterface[];
  paginate: PaginationInterface | null;
  is_loading: boolean;
  error: string;
}

// Model
export interface ProfilePostInterface extends CommentInterface {}
