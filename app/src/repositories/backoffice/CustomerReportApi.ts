import {
  GetCustomerReportListParams,
  GetCustomerReportListResponse,
  GetCustomerReportParams,
  GetCustomerReportResponse,
  UpdateCustomerReportParams,
  UpdateCustomerReportResponse,
} from "@interfaces/backoffice/CustomerReportInterface";
import CustomerReportMockApi from "@mocks/backoffice/CustomerReportMockApi";
import ApiClient from "@repositories/ApiClient";

type ReturnType<T> = Promise<T>;

class CustomerReportApi {
  private baseUrl = import.meta.env.VITE_BACKOFFICE_API_URL;

  public async index(params: GetCustomerReportListParams): ReturnType<GetCustomerReportListResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return CustomerReportMockApi.index(params, true);
    }
    return ApiClient.get<GetCustomerReportListParams, GetCustomerReportListResponse>(`${this.baseUrl}/customer-reports`, params);
  }

  public async show(params: GetCustomerReportParams): ReturnType<GetCustomerReportResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return CustomerReportMockApi.show(params, true);
    }
    return ApiClient.get<GetCustomerReportParams, GetCustomerReportResponse>(`${this.baseUrl}/customer-reports/${params.id}`, params);
  }

  public async update(params: UpdateCustomerReportParams): ReturnType<UpdateCustomerReportResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return CustomerReportMockApi.update(params, true);
    }
    return ApiClient.put<UpdateCustomerReportParams, UpdateCustomerReportResponse>(`${this.baseUrl}/customer-reports/${params.id}`, params);
  }
}

export default new CustomerReportApi();
