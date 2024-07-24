import { CustomerReportParams, CustomerReportResponse } from "@interfaces/frontside/CustomerReportInterface";
import CustomerReportMockApi from "@mocks/frontside/CustomerReportMockApi";
import ApiClient from "@repositories/ApiClient";

type ReturnType<T> = Promise<T>;

class CustomerReportApi {
  private baseUrl = import.meta.env.VITE_FRONT_SIDE_API_URL;

  public async report(params: CustomerReportParams): ReturnType<CustomerReportResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return CustomerReportMockApi.report(params, true);
    }
    return ApiClient.postJson<CustomerReportParams, CustomerReportResponse>(`${this.baseUrl}/customer-report`, params);
  }
}

export default new CustomerReportApi();
