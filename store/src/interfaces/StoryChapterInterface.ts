import { OrderByEnum } from "@enums/OrderByEnum";
import { ImageInterface } from "@interfaces/ImageInterface";
import { PaginationInterface } from "@interfaces/PaginationInterface";

// API Design
// chapterList [method get] : '/story-chapters/slug'
// params StoryChapterParams
// return StoryChapterResponse

// APIs Parameter Interface
export interface StoryChapterParams {
  slug: string;
  page: number;
  per_page: number;
  order_by?: OrderByEnum;
}

// APIs Response Interface
export interface StoryChapterResponse {
  data: StoryChapterInterface[];
  current: number;
  next: number | null;
  previous: number | null;
  last: number | null;
  total: number | null;
}

// State Interface
export interface StoryChapterSliceInterface {
  data: StoryChapterInterface[];
  paginate: PaginationInterface | null;
  is_loading: boolean;
  error: string;
}

// Model
export interface StoryChapterInterface {
  id: number;
  chapter_number: number;
  name: string;
  score: number; // calculate from like / total reaction
  view_count: number;
  release_date: string;
  cover_images: ImageInterface[];
}
