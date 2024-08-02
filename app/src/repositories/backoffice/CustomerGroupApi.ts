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
import ApiClient from "@repositories/ApiClient";

type ReturnType<T> = Promise<T>;

class CustomerGroupApi {
  private baseUrl = import.meta.env.VITE_BACKOFFICE_API_URL;

  private async getMockApi() {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      const module = await import("@mocks/backoffice/CustomerGroupMockApi");
      return module.default;
    }
    return null;
  }

  public async index(params: GetCustomerGroupListParams): ReturnType<GetCustomerGroupListResponse> {
    const CustomerGroupMockApi = await this.getMockApi();
    if (CustomerGroupMockApi) {
      return CustomerGroupMockApi.index(params, true);
    }
    return ApiClient.get<GetCustomerGroupListParams, GetCustomerGroupListResponse>(`${this.baseUrl}/customer-groups`, params);
  }

  public async create(params: CreateCustomerGroupParams): ReturnType<CreateCustomerGroupResponse> {
    const CustomerGroupMockApi = await this.getMockApi();
    if (CustomerGroupMockApi) {
      return CustomerGroupMockApi.create(params, true);
    }
    return ApiClient.postJson<CreateCustomerGroupParams, CreateCustomerGroupResponse>(`${this.baseUrl}/customer-groups`, params);
  }

  public async show(params: GetCustomerGroupParams): ReturnType<GetCustomerGroupResponse> {
    const CustomerGroupMockApi = await this.getMockApi();
    if (CustomerGroupMockApi) {
      return CustomerGroupMockApi.show(params, true);
    }
    return ApiClient.get<GetCustomerGroupParams, GetCustomerGroupResponse>(`${this.baseUrl}/customer-groups/${params.id}`, params);
  }

  public async update(params: UpdateCustomerGroupParams): ReturnType<UpdateCustomerGroupResponse> {
    const CustomerGroupMockApi = await this.getMockApi();
    if (CustomerGroupMockApi) {
      return CustomerGroupMockApi.update(params, true);
    }
    return ApiClient.put<UpdateCustomerGroupParams, UpdateCustomerGroupResponse>(`${this.baseUrl}/customer-groups/${params.id}`, params);
  }

  public async delete(params: DeleteCustomerGroupParams): ReturnType<DeleteCustomerGroupResponse> {
    const CustomerGroupMockApi = await this.getMockApi();
    if (CustomerGroupMockApi) {
      return CustomerGroupMockApi.delete(params, true);
    }
    return ApiClient.delete<DeleteCustomerGroupParams, DeleteCustomerGroupResponse>(`${this.baseUrl}/customer-groups/${params.id}`, params);
  }
}

export default new CustomerGroupApi();
