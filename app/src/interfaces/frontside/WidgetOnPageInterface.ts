import { WidgetTypeEnum } from "@enums/frontside/WidgetTypeEnum";
import { BannerInterface } from "@interfaces/frontside/BannerInterface";

// API Design

// widgetOnPage [method get] : '/widgets-on-page'
// params WidgetOnPageParams
// return WidgetOnPageResponse

// APIs Parameter Interface
export interface WidgetOnPageParams {}

// APIs Response Interface
export interface WidgetOnPageResponse {
  data: WidgetInterface[];
}

// State Interface
export interface WidgetOnPageSliceInterface {
  data: WidgetInterface[];
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
