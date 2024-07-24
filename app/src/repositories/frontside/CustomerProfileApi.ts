import {
  CustomerProfileParams,
  CustomerProfileResponse,
  UpdateCustomerProfileParams,
  UpdateCustomerProfileResponse,
} from "@interfaces/frontside/CustomerProfileInterface";
import CustomerProfileMockApi from "@mocks/frontside/CustomerProfileMockApi";
import ApiClient from "@repositories/ApiClient";

type ReturnType<T> = Promise<T>;

class CustomerProfileApi {
  private baseUrl = import.meta.env.VITE_FRONT_SIDE_API_URL;

  public async getProfile(params: CustomerProfileParams): ReturnType<CustomerProfileResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return CustomerProfileMockApi.getProfile(params, true);
    }
    return ApiClient.get<CustomerProfileParams, CustomerProfileResponse>(`${this.baseUrl}/customer-profile`, params);
  }

  public async updateProfile(params: UpdateCustomerProfileParams): ReturnType<UpdateCustomerProfileResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return CustomerProfileMockApi.updateProfile(params, true);
    }
    return ApiClient.put<UpdateCustomerProfileParams, UpdateCustomerProfileResponse>(`${this.baseUrl}/customer-profile`, params);
  }
}

export default new CustomerProfileApi();
