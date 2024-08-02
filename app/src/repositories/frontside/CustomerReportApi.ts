import { CustomerReportParams, CustomerReportResponse } from "@interfaces/frontside/CustomerReportInterface";
import ApiClient from "@repositories/ApiClient";

type ReturnType<T> = Promise<T>;

class CustomerReportApi {
  private baseUrl = import.meta.env.VITE_FRONT_SIDE_API_URL;

  private async getMockApi() {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      const module = await import("@mocks/frontside/CustomerReportMockApi");
      return module.default;
    }
    return null;
  }

  public async report(params: CustomerReportParams): ReturnType<CustomerReportResponse> {
    const CustomerReportMockApi = await this.getMockApi();
    if (CustomerReportMockApi) {
      return CustomerReportMockApi.report(params, true);
    }
    return ApiClient.postJson<CustomerReportParams, CustomerReportResponse>(`${this.baseUrl}/customer-report`, params);
  }
}

export default new CustomerReportApi();
