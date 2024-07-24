import { BannerTypeEnum } from "@enums/backoffice/BannerTypeEnum";
import { CollectionEnum } from "@enums/backoffice/CollectionEnum";
import { BannerStatusEnum } from "@enums/backoffice/StatusEnum";
import { ChapterListInterface } from "@interfaces/backoffice/ChapterInterface";
import { ImageInterface } from "@interfaces/backoffice/ImageInterface";
import { PaginationInterface } from "@interfaces/backoffice/PaginationInterface";
import { StoryListInterface } from "@interfaces/backoffice/StoryInterface";

// API Design
// bannerList [method get] : '/banners'
// params GetBannerListParams
// return GetBannerListResponse

// bannerCreate [method post] : '/banners'
// params CreateBannerParams
// return CreateBannerResponse

// bannerShow [method get] : '/banners/id'
// params GetBannerParams
// return GetBannerResponse

// bannerUpdate [method put] : '/banners/id'
// params UpdateBannerParams
// return UpdateBannerResponse

// bannerDelete [method delete] : '/banners/id'
// params DeleteBannerParams
// return DeleteBannerResponse

// APIs Parameter Interface
export interface GetBannerListParams {
  q?: string;
  status?: BannerStatusEnum;
  type?: BannerTypeEnum;
  start_date?: string;
  end_date?: string;
  page: number;
  per_page: number;
  order_by: string;
}

export interface CreateBannerParams {
  name: string;
  title: string;
  type: BannerTypeEnum;
  link: string;
  status: BannerStatusEnum;
  story_id: number | null;
  chapter_id: number | null;
  image_ids: number[];
}

export interface GetBannerParams {
  id: number;
}

export interface UpdateBannerParams {
  id: number;
  name: string;
  title: string;
  type: BannerTypeEnum;
  link: string;
  status: BannerStatusEnum;
  story_id: number | null;
  chapter_id: number | null;
  image_ids: number[];
}

export interface DeleteBannerParams {
  id: number;
}

// APIs Response Interface
export interface GetBannerListResponse {
  data: BannerListInterface[];
  current: number;
  next: number | null;
  previous: number | null;
  last: number | null;
  total: number | null;
}

export interface CreateBannerResponse extends BannerInterface {}

export interface GetBannerResponse extends BannerInterface {}

export interface UpdateBannerResponse extends BannerInterface {}

export interface DeleteBannerResponse {}

// State Interface
export interface BannerListSliceInterface {
  data: BannerListInterface[];
  paginate: PaginationInterface | null;
  filter: BannerListFilterInterface | null;
  is_loading: boolean;
  error: string;
}

export interface BannerSliceInterface {
  data: BannerInterface | null;
  is_loading: boolean;
  error: string;
}

export interface BannerCreateEditSliceInterface {
  [key: string]: any;
  name: string | null;
  title: string | null;
  type: BannerTypeEnum | null;
  link: string | null;
  status: BannerStatusEnum | null;
  story: StoryListInterface | null;
  chapter: ChapterListInterface | null;
  images: BannerImageInterface[] | ImageInterface[];

  // validate message
  name_error_message: string;
  title_error_message: string;
  link_error_message: string;
  story_error_message: string;
  chapter_error_message: string;
  images_error_message: string;
}

// Model
export interface BannerListInterface {
  id: number;
  name: string;
  type: BannerTypeEnum;
  status: BannerStatusEnum;
  created_at: string;
  updated_at: string;
}

export interface BannerListFilterInterface {
  q: string;
  status: BannerStatusEnum;
  type: BannerTypeEnum;
  start_date: string;
  end_date: string;
  page: number;
  per_page: number;
  order_by: string;
}

export interface BannerInterface {
  [key: string]: any;
  id: number;
  name: string;
  title: string;
  type: BannerTypeEnum;
  link: string;
  status: BannerStatusEnum;
  story: StoryListInterface | null;
  chapter: ChapterListInterface | null;
  images: ImageInterface[];
  created_at: string;
  updated_at: string;
}

export interface BannerImageInterface {
  file: File | ImageInterface | null;
  collection_name: CollectionEnum;
}
