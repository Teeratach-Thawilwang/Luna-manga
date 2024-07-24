// API Design
// getDashboard [method get] : '/dashboard'
// params GetDashboardParams
// return GetDashboardResponse
import { DashboardItemEnum } from "@enums/backoffice/DashboardItemEnum";

// APIs Parameter Interface
export interface GetDashboardParams {}

// APIs Response Interface
export interface GetDashboardResponse {
  data: DashboardInterface[];
}

// State Interface
export interface DashboardSliceInterface {
  data: DashboardInterface[];
  is_loading: boolean;
  error: string;
}

// Model
export interface DashboardInterface {
  [key: string]: any;
  name: DashboardItemEnum;
  middle: string;
  left_bottom: string[];
  right_bottom: string[];
}
