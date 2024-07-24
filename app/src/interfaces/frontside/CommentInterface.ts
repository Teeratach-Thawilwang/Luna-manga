import { ImageInterface } from "@interfaces/frontside/ImageInterface";

export interface CommentInterface {
  id: number;
  message: string;
  commenter: CommenterInterface;
  reaction: CommentReactionInterface;
  created_at: string;
  updated_at: string;
}

export interface CommenterInterface {
  id: number;
  display_name: string; // if nickName is null, it's full name.
  images: ImageInterface[];
}

export interface CommentReactionInterface {
  like: number;
  dislike: number;
  is_liked: boolean; // false if token is guest.
  is_disliked: boolean; // false if token is guest.
}
