import {
  CreateCustomerGroupParams,
  CreateCustomerGroupResponse,
  DeleteCustomerGroupParams,
  DeleteCustomerGroupResponse,
  GetCustomerGroupListParams,
  GetCustomerGroupListResponse,
  GetCustomerGroupParams,
  GetCustomerGroupResponse,
  UpdateCustomerGroupParams,
  UpdateCustomerGroupResponse,
} from "@interfaces/backoffice/CustomerGroupInterface";
import CustomerGroupMockApi from "@mocks/backoffice/CustomerGroupMockApi";
import ApiClient from "@repositories/ApiClient";

type ReturnType<T> = Promise<T>;

class CustomerGroupApi {
  private baseUrl = import.meta.env.VITE_BACKOFFICE_API_URL;

  public async index(params: GetCustomerGroupListParams): ReturnType<GetCustomerGroupListResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return CustomerGroupMockApi.index(params, true);
    }
    return ApiClient.get<GetCustomerGroupListParams, GetCustomerGroupListResponse>(`${this.baseUrl}/customer-groups`, params);
  }

  public async create(params: CreateCustomerGroupParams): ReturnType<CreateCustomerGroupResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return CustomerGroupMockApi.create(params, true);
    }
    return ApiClient.postJson<CreateCustomerGroupParams, CreateCustomerGroupResponse>(`${this.baseUrl}/customer-groups`, params);
  }

  public async show(params: GetCustomerGroupParams): ReturnType<GetCustomerGroupResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return CustomerGroupMockApi.show(params, true);
    }
    return ApiClient.get<GetCustomerGroupParams, GetCustomerGroupResponse>(`${this.baseUrl}/customer-groups/${params.id}`, params);
  }

  public async update(params: UpdateCustomerGroupParams): ReturnType<UpdateCustomerGroupResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return CustomerGroupMockApi.update(params, true);
    }
    return ApiClient.put<UpdateCustomerGroupParams, UpdateCustomerGroupResponse>(`${this.baseUrl}/customer-groups/${params.id}`, params);
  }

  public async delete(params: DeleteCustomerGroupParams): ReturnType<DeleteCustomerGroupResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return CustomerGroupMockApi.delete(params, true);
    }
    return ApiClient.delete<DeleteCustomerGroupParams, DeleteCustomerGroupResponse>(`${this.baseUrl}/customer-groups/${params.id}`, params);
  }
}

export default new CustomerGroupApi();
