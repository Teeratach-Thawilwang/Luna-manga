import { CommentInterface, CommentReactionInterface } from "@interfaces/CommentInterface";
import { PaginationInterface } from "@interfaces/PaginationInterface";

// API Design
// chapterCommentList [method get] : '/comments'
// params ChapterCommentParams
// return ChapterCommentResponse

// createComment [method post] : '/comments'
// params CreateCommentParams
// return CreateCommentResponse

// deleteComment [method delete] : '/comments/<commentId>'
// params DeleteCommentParams
// return DeleteCommentResponse

// chapterCommentReaction [method put] : '/comment-reaction/<commentId>'
// params ChapterCommentReactionParams
// return ChapterCommentReactionResponse

// APIs Parameter Interface
export interface ChapterCommentParams {
  chapter_id: number;
  page: number;
  per_page: number;
  order_by?: string;
}

export interface CreateCommentParams {
  chapter_id: number;
  customer_id: number;
  message: string;
}

export interface DeleteCommentParams {
  chapter_id: number;
  comment_id: number;
}

export interface ChapterCommentReactionParams {
  customer_id: number;
  comment_id: number;
  like?: number;
  dislike?: number;
}

// APIs Response Interface
export interface ChapterCommentResponse {
  data: ChapterCommentInterface[];
  current: number;
  next: number | null;
  previous: number | null;
  last: number | null;
  total: number | null;
}

export interface CreateCommentResponse extends ChapterCommentInterface {}

export interface DeleteCommentResponse {}

export interface ChapterCommentReactionResponse extends CommentReactionInterface {}

// State Interface
export interface ChapterCommentSliceInterface {
  data: ChapterCommentInterface[];
  paginate: PaginationInterface | null;
  is_loading: boolean;
  error: string;
}

// Model
export interface ChapterCommentInterface extends CommentInterface {}
