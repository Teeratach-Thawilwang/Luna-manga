import {
  GetCustomerReportListParams,
  GetCustomerReportListResponse,
  GetCustomerReportParams,
  GetCustomerReportResponse,
  UpdateCustomerReportParams,
  UpdateCustomerReportResponse,
} from "@interfaces/backoffice/CustomerReportInterface";
// import CustomerReportMockApi from "@mocks/backoffice/CustomerReportMockApi";
import ApiClient from "@repositories/ApiClient";

type ReturnType<T> = Promise<T>;

class CustomerReportApi {
  private baseUrl = import.meta.env.VITE_BACKOFFICE_API_URL;

  private async getMockApi() {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      const module = await import("@mocks/backoffice/CustomerReportMockApi");
      return module.default;
    }
    return null;
  }

  public async index(params: GetCustomerReportListParams): ReturnType<GetCustomerReportListResponse> {
    const CustomerReportMockApi = await this.getMockApi();
    if (CustomerReportMockApi) {
      return CustomerReportMockApi.index(params, true);
    }
    return ApiClient.get<GetCustomerReportListParams, GetCustomerReportListResponse>(`${this.baseUrl}/customer-reports`, params);
  }

  public async show(params: GetCustomerReportParams): ReturnType<GetCustomerReportResponse> {
    const CustomerReportMockApi = await this.getMockApi();
    if (CustomerReportMockApi) {
      return CustomerReportMockApi.show(params, true);
    }
    return ApiClient.get<GetCustomerReportParams, GetCustomerReportResponse>(`${this.baseUrl}/customer-reports/${params.id}`, params);
  }

  public async update(params: UpdateCustomerReportParams): ReturnType<UpdateCustomerReportResponse> {
    const CustomerReportMockApi = await this.getMockApi();
    if (CustomerReportMockApi) {
      return CustomerReportMockApi.update(params, true);
    }
    return ApiClient.put<UpdateCustomerReportParams, UpdateCustomerReportResponse>(`${this.baseUrl}/customer-reports/${params.id}`, params);
  }
}

export default new CustomerReportApi();
