import { CategoryTypeEnum } from "@enums/frontside/CategoryTypeEnum";
// import { ContentRateEnum } from "@enums/frontside/ContentRateEnum";
import { CategoryInterface } from "@interfaces/frontside/CategoryInterface";
import { ImageInterface } from "@interfaces/frontside/ImageInterface";

// API Design
// show [method get] : '/story/slug'
// params StoryShowParams
// return StoryShowResponse

// storyReaction [method put] : '/story-reaction/<story_id>'
// params StoryReactionParams
// return StoryReactionResponse

// APIs Parameter Interface
export interface StoryShowParams {
  slug: string;
}

export interface StoryReactionParams {
  customer_id: number;
  story_id: number;
  like?: number;
  dislike?: number;
}

// APIs Response Interface
export interface StoryShowResponse extends StoryInterface {}

export interface StoryReactionResponse extends StoryReactionInterface {}

// State Interface
export interface StorySliceInterface {
  data: StoryInterface | null;
  is_loading: boolean;
  error: string;
}

// Model Interface
export interface StoryInterface {
  id: number;
  slug: string;
  name: string;
  // content_rate: ContentRateEnum;
  description: string;
  view_count: number;
  type: CategoryTypeEnum;
  reaction: StoryReactionInterface;
  author: StoryAuthor;
  images: ImageInterface[];
  categories: CategoryInterface[];
  is_bookmark: boolean; // false if token is guest
}

export interface StoryAuthor {
  id: number;
  display_name: string; // if nickName is null, it's full name.
}

export interface StoryReactionInterface {
  like: number;
  dislike: number;
  is_liked: boolean; // false if token is guest.
  is_disliked: boolean; // false if token is guest.
  rating_score: number;
}
