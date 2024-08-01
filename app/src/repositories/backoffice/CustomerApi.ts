import {
  GetCustomerListParams,
  GetCustomerListResponse,
  GetCustomerParams,
  GetCustomerResponse,
  UpdateCustomerParams,
  UpdateCustomerResponse,
} from "@interfaces/backoffice/CustomerInterface";
// import CustomerMockApi from "@mocks/backoffice/CustomerMockApi";
import ApiClient from "@repositories/ApiClient";

type ReturnType<T> = Promise<T>;

class CustomerApi {
  private baseUrl = import.meta.env.VITE_BACKOFFICE_API_URL;

  private async getMockApi() {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      const module = await import("@mocks/backoffice/CustomerMockApi");
      return module.default;
    }
    return null;
  }

  public async index(params: GetCustomerListParams): ReturnType<GetCustomerListResponse> {
    const CustomerMockApi = await this.getMockApi();
    if (CustomerMockApi) {
      return CustomerMockApi.index(params, true);
    }
    return ApiClient.get<GetCustomerListParams, GetCustomerListResponse>(`${this.baseUrl}/customers`, params);
  }

  public async show(params: GetCustomerParams): ReturnType<GetCustomerResponse> {
    const CustomerMockApi = await this.getMockApi();
    if (CustomerMockApi) {
      return CustomerMockApi.show(params, true);
    }
    return ApiClient.get<GetCustomerParams, GetCustomerResponse>(`${this.baseUrl}/customers/${params.id}`, params);
  }

  public async update(params: UpdateCustomerParams): ReturnType<UpdateCustomerResponse> {
    const CustomerMockApi = await this.getMockApi();
    if (CustomerMockApi) {
      return CustomerMockApi.update(params, true);
    }
    return ApiClient.put<UpdateCustomerParams, UpdateCustomerResponse>(`${this.baseUrl}/customers/${params.id}`, params);
  }
}

export default new CustomerApi();
