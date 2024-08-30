import { CategoryTypeEnum } from "@enums/CategoryTypeEnum";
import { AudioInterface } from "@interfaces/AudioInterface";
import { ImageInterface } from "@interfaces/ImageInterface";

// API Design
// chapter [method get] : '/story/<slug>/chapter/<chapter_number>'
// params ChapterShowParams
// return ChapterShowResponse

// chapterReaction [method put] : '/chapter-reaction/<chapter_id>'
// params ChapterReactionParams
// return ChapterReactionResponse

// APIs Parameter Interface
export interface ChapterShowParams {
  slug: string;
  chapter_number: number;
}

export interface ChapterReactionParams {
  customer_id: number;
  chapter_id: number;
  like?: number;
  dislike?: number;
}

// APIs Response Interface
export interface ChapterShowResponse extends ChapterInterface {}

export interface ChapterReactionResponse extends ChapterReactionInterface {}

// State Interface
export interface ChapterSliceInterface {
  data: ChapterInterface | null;
  is_loading: boolean;
  is_accept_audio: boolean;
  audio_current: number;
  error: string;
}

// Model
export interface ChapterInterface {
  id: number;
  story_name: string;
  type: CategoryTypeEnum;
  text: string;
  images: ImageInterface[];
  audio: AudioInterface[];
  reaction: ChapterReactionInterface;
  chapter_list: ChapterListInterface[];
}

export interface ChapterReactionInterface {
  like: number;
  dislike: number;
  is_liked: boolean; // false if token is guest.
  is_disliked: boolean; // false if token is guest.
}

export interface ChapterListInterface {
  id: number;
  name: string;
  chapter_number: number;
}
