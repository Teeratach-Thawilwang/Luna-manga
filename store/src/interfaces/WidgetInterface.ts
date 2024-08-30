import { WidgetTypeEnum } from "@enums/WidgetTypeEnum";
import { BannerIndexResponseInterface, BannerInterface } from "@interfaces/BannerInterface";
import { PaginationInterface } from "@interfaces/PaginationInterface";

// API Design
// index [method get] : '/widgets'
// params WidgetIndexParams
// return WidgetIndexResponse

// widgetsBanners [method get] : '/widgets/<widget-id>/banners'
// params WidgetsBannersParams
// return WidgetsBannersResponse
// paginate for banner

// APIs Parameter Interface
export interface WidgetIndexParams {
  page: number;
  per_page: number;
}

export interface WidgetsBannersParams {
  id: number;
  page: number;
  per_page: number;
}

// APIs Response Interface
export interface WidgetIndexResponse {
  data: WidgetsBannersResponse[];
  current: number;
  next: number | null;
  previous: number | null;
  last: number | null;
  total: number | null;
}

export interface WidgetsBannersResponse {
  id: number;
  sequence: number;
  title: string;
  type: WidgetTypeEnum;
  banners: BannerIndexResponseInterface;
}

// State Interface
export interface WidgetSliceInterface {
  data: WidgetStateInterface[];
  paginate: PaginationInterface | null; // paginate for widgets
  is_loading: boolean;
  error: string;
}

export interface WidgetStateInterface {
  data: WidgetInterface;
  paginate: PaginationInterface | null; // paginate for banners
  is_loading: boolean;
  error: string;
}

// Model
export interface WidgetInterface {
  id: number;
  sequence: number;
  title: string;
  type: WidgetTypeEnum;
  banners: BannerInterface[];
}
