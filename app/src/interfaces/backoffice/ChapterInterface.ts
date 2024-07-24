import { CategoryTypeEnum } from "@enums/backoffice/CategoryTypeEnum";
import { ChapterStatusEnum } from "@enums/backoffice/StatusEnum";
import { MangaEditorElement, TextEditorElement } from "@interfaces/EditorInterface";
import { AudioInterface } from "@interfaces/backoffice/AudioInterface";
import { ImageInterface } from "@interfaces/backoffice/ImageInterface";
import { PaginationInterface } from "@interfaces/backoffice/PaginationInterface";
import { StoryListInterface } from "@interfaces/backoffice/StoryInterface";

// API Design
// chapterList [method get] : '/chapters'
// params GetChapterListParams
// return GetChapterListResponse

// chapterCreate [method post] : '/chapters'
// params CreateChapterParams
// return CreateChapterResponse

// chapterShow [method get] : '/chapters/id'
// params GetChapterParams
// return GetChapterResponse

// chapterUpdate [method put] : '/chapters/id'
// params UpdateChapterParams
// return UpdateChapterResponse

// chapterDelete [method delete] : '/chapters/id'
// params DeleteChapterParams
// return DeleteChapterResponse

// APIs Parameter Interface
export interface GetChapterListParams {
  q?: string;
  status?: ChapterStatusEnum;
  start_date?: string;
  end_date?: string;
  type: CategoryTypeEnum;
  page: number;
  per_page: number;
  order_by: string;
}

export interface CreateChapterParams {
  story_id: number;
  name: string;
  chapter_number: number;
  type: CategoryTypeEnum;
  status: ChapterStatusEnum;
  text: string;
  cover_image_id: number;
}

export interface GetChapterParams {
  id: number;
}

export interface UpdateChapterParams {
  id: number;
  story_id: number;
  name: string;
  chapter_number: number;
  type: CategoryTypeEnum;
  status: ChapterStatusEnum;
  text: string;
  cover_image_id: number;
}

export interface DeleteChapterParams {
  id: number;
}

// APIs Response Interface
export interface GetChapterListResponse {
  data: ChapterListInterface[];
  current: number;
  next: number | null;
  previous: number | null;
  last: number | null;
  total: number | null;
}

export interface CreateChapterResponse extends ChapterInterface {}

export interface GetChapterResponse extends ChapterInterface {}

export interface UpdateChapterResponse extends ChapterInterface {}

export interface DeleteChapterResponse {}

// State Interface
export interface ChapterListSliceInterface {
  data: ChapterListInterface[];
  paginate: PaginationInterface | null;
  filter: ChapterListFilterInterface | null;
  is_loading: boolean;
  error: string;
}

export interface ChapterSliceInterface {
  data: ChapterInterface | null;
  is_loading: boolean;
  error: string;
}

export interface ChapterCreateEditSliceInterface {
  [key: string]: any;
  story: StoryListInterface | null;
  name: string | null;
  chapter_number: number | null;
  type: CategoryTypeEnum | null;
  status: ChapterStatusEnum | null;
  cover_image: File | ImageInterface | null;
  text_editor: TextEditorElement[];
  manga_editor: MangaEditorElement[];

  // validate message
  story_error_message: string;
  name_error_message: string;
  chapter_number_error_message: string;
  cover_image_error_message: string;
  text_editor_error_message: string;
  manga_editor_error_message: string;
}

// Model
export interface ChapterListInterface {
  id: number;
  story_id: number;
  name: string;
  chapter_number: number;
  score: number;
  view_count: number;
  type: CategoryTypeEnum;
  status: ChapterStatusEnum;
  created_at: string;
  updated_at: string;
}

export interface ChapterListFilterInterface {
  q: string;
  status: ChapterStatusEnum;
  start_date: string;
  end_date: string;
  page: number;
  per_page: number;
  order_by: string;
}

export interface ChapterInterface {
  [key: string]: any;
  id: number;
  story: StoryListInterface;
  name: string;
  chapter_number: number;
  type: CategoryTypeEnum;
  status: ChapterStatusEnum;
  cover_image: ImageInterface[];
  text: string;
  images: ImageInterface[];
  audio: AudioInterface[];
  score: number;
  view_count: number;
  created_at: string;
  updated_at: string;
}
