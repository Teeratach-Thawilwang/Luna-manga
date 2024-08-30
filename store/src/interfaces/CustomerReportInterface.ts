// API Design
import { CustomerReportGroupEnum } from "@enums/CustomerReportGroupEnum";
import { CustomerReportSourceEnum } from "@enums/CustomerReportSourceEnum";

// customerReport [method post] : '/customer-report
// params CustomerReportParams
// return CustomerReportResponse - 200 ok

// APIs Parameter Interface
export interface CustomerReportParams {
  group: CustomerReportGroupEnum;
  model_id: number; // model_id
  source: CustomerReportSourceEnum; // model_type
  customer_id: number;
  message?: string;
}

// APIs Response Interface
export interface CustomerReportResponse {}
