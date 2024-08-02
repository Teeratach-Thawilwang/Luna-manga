import {
  CustomerProfileParams,
  CustomerProfileResponse,
  UpdateCustomerProfileParams,
  UpdateCustomerProfileResponse,
} from "@interfaces/frontside/CustomerProfileInterface";
import ApiClient from "@repositories/ApiClient";

type ReturnType<T> = Promise<T>;

class CustomerProfileApi {
  private baseUrl = import.meta.env.VITE_FRONT_SIDE_API_URL;

  private async getMockApi() {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      const module = await import("@mocks/frontside/CustomerProfileMockApi");
      return module.default;
    }
    return null;
  }

  public async getProfile(params: CustomerProfileParams): ReturnType<CustomerProfileResponse> {
    const CustomerProfileMockApi = await this.getMockApi();
    if (CustomerProfileMockApi) {
      return CustomerProfileMockApi.getProfile(params, true);
    }
    return ApiClient.get<CustomerProfileParams, CustomerProfileResponse>(`${this.baseUrl}/customer-profile`, params);
  }

  public async updateProfile(params: UpdateCustomerProfileParams): ReturnType<UpdateCustomerProfileResponse> {
    const CustomerProfileMockApi = await this.getMockApi();
    if (CustomerProfileMockApi) {
      return CustomerProfileMockApi.updateProfile(params, true);
    }
    return ApiClient.put<UpdateCustomerProfileParams, UpdateCustomerProfileResponse>(`${this.baseUrl}/customer-profile`, params);
  }
}

export default new CustomerProfileApi();
