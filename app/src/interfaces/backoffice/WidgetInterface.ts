import { WidgetStatusEnum } from "@enums/backoffice/StatusEnum";
import { WidgetTypeEnum } from "@enums/backoffice/WidgetTypeEnum";
import { BannerListInterface } from "@interfaces/backoffice/BannerInterface";
import { PaginationInterface } from "@interfaces/backoffice/PaginationInterface";

// API Design
// widgetList [method get] : '/widgets'
// params GetWidgetListParams
// return GetWidgetListResponse

// widgetCreate [method post] : '/widgets'
// params CreateWidgetParams
// return CreateWidgetResponse

// widgetShow [method get] : '/widgets/id'
// params GetWidgetParams
// return GetWidgetResponse

// widgetUpdate [method put] : '/widgets/id'
// params UpdateWidgetParams
// return UpdateWidgetResponse

// widgetDelete [method delete] : '/widgets/id'
// params DeleteWidgetParams
// return DeleteWidgetResponse

// widgetSequence [method get] : '/widget-sequence'
// params GetWidgetSequenceParams
// return GetWidgetSequenceResponse

// updateWidgetSequence [method put] : '/widget-sequence'
// params UpdateWidgetSequenceParams
// return UpdateWidgetSequenceResponse

// APIs Parameter Interface
export interface GetWidgetListParams {
  q?: string;
  status?: WidgetStatusEnum;
  type?: WidgetTypeEnum;
  start_date?: string;
  end_date?: string;
  page: number;
  per_page: number;
  order_by: string;
}

export interface CreateWidgetParams {
  name: string;
  title: string;
  type: WidgetTypeEnum;
  status: WidgetStatusEnum;
  banner_ids: number[];
}

export interface GetWidgetParams {
  id: number;
}

export interface UpdateWidgetParams {
  id: number;
  name: string;
  title: string;
  type: WidgetTypeEnum;
  status: WidgetStatusEnum;
  banner_ids: number[];
}

export interface DeleteWidgetParams {
  id: number;
}

export interface GetWidgetSequenceParams {}

export interface UpdateWidgetSequenceParams {
  widget_ids: number[];
}

// APIs Response Interface
export interface GetWidgetListResponse {
  data: WidgetListInterface[];
  current: number;
  next: number | null;
  previous: number | null;
  last: number | null;
  total: number | null;
}

export interface CreateWidgetResponse extends WidgetInterface {}

export interface GetWidgetResponse extends WidgetInterface {}

export interface UpdateWidgetResponse extends WidgetInterface {}

export interface DeleteWidgetResponse {}

export interface GetWidgetSequenceResponse {
  data: WidgetSequenceInterface[];
}

export interface UpdateWidgetSequenceResponse {
  data: WidgetSequenceInterface[];
}

// State Interface
export interface WidgetListSliceInterface {
  data: WidgetListInterface[];
  paginate: PaginationInterface | null;
  filter: WidgetListFilterInterface | null;
  is_loading: boolean;
  error: string;
}

export interface WidgetSequenceSliceInterface {
  data: WidgetSequenceInterface[];
  is_loading: boolean;
  error: string;
}

export interface WidgetSliceInterface {
  data: WidgetInterface | null;
  is_loading: boolean;
  error: string;
}

export interface WidgetCreateEditSliceInterface {
  [key: string]: any;
  name: string | null;
  title: string | null;
  type: WidgetTypeEnum | null;
  status: WidgetStatusEnum | null;
  banners: BannerListInterface[];

  // validate message
  name_error_message: string;
  title_error_message: string;
  banner_error_message: string;
}

// Model
export interface WidgetListInterface {
  id: number;
  name: string;
  total_banner: number;
  type: WidgetTypeEnum;
  status: WidgetStatusEnum;
  created_at: string;
  updated_at: string;
}

export interface WidgetSequenceInterface {
  id: number;
  sequence: number;
  name: string;
  total_banner: number;
  type: WidgetTypeEnum;
  status: WidgetStatusEnum;
  created_at: string;
  updated_at: string;
}

export interface WidgetListFilterInterface {
  q: string;
  status: WidgetStatusEnum;
  type: WidgetTypeEnum;
  start_date: string;
  end_date: string;
  page: number;
  per_page: number;
  order_by: string;
}

export interface WidgetInterface {
  [key: string]: any;
  id: number;
  name: string;
  title: string;
  type: WidgetTypeEnum;
  status: WidgetStatusEnum;
  banners: BannerListInterface[];
}
