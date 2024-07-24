import { CategoryTypeEnum } from "@enums/frontside/CategoryTypeEnum";
import { CategoryInterface } from "@interfaces/frontside/CategoryInterface";
import { ImageInterface } from "@interfaces/frontside/ImageInterface";

// API Design
// searchStory [method get] : '/story-search'
// params StorySearchParams
// return StorySearchResponse

// APIs Parameter Interface
export interface StorySearchParams {
  q: string;
  per_page?: number;
}

// APIs Response Interface
export interface StorySearchResponse {
  data: StorySearchInterface[];
}

// State Interface
export interface StorySearchSliceInterface {
  q: string;
  data: StorySearchInterface[];
  is_modal_show: boolean;
  is_loading: boolean;
  error: string;
}

// Model Interface
export interface StorySearchInterface {
  [key: string]: any;
  id: number;
  slug: string;
  name: string;
  type: CategoryTypeEnum;
  author: StorySearchAuthor;
  rating_score: number;
  view_count: number;
  images: ImageInterface[];
  categories: CategoryInterface[];
}

export interface StorySearchAuthor {
  id: number;
  display_name: string; // if nickName is null, it's full name.
}
