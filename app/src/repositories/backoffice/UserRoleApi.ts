import {
  CreateUserRoleParams,
  CreateUserRoleResponse,
  DeleteUserRoleParams,
  DeleteUserRoleResponse,
  GetUserRoleListParams,
  GetUserRoleListResponse,
  GetUserRoleParams,
  GetUserRoleResponse,
  UpdateUserRoleParams,
  UpdateUserRoleResponse,
} from "@interfaces/backoffice/UserRoleInterface";
// import UserRoleMockApi from "@mocks/backoffice/UserRoleMockApi";
import ApiClient from "@repositories/ApiClient";

type ReturnType<T> = Promise<T>;

class UserRoleApi {
  private baseUrl = import.meta.env.VITE_BACKOFFICE_API_URL;

  private async getMockApi() {
    const UserRoleMockApi = await this.getMockApi();
    if (UserRoleMockApi) {
      const module = await import("@mocks/backoffice/UserRoleMockApi");
      return module.default;
    }
    return null;
  }

  public async index(params: GetUserRoleListParams): ReturnType<GetUserRoleListResponse> {
    const UserRoleMockApi = await this.getMockApi();
    if (UserRoleMockApi) {
      return UserRoleMockApi.index(params, true);
    }
    return ApiClient.get<GetUserRoleListParams, GetUserRoleListResponse>(`${this.baseUrl}/roles`, params);
  }

  public async create(params: CreateUserRoleParams): ReturnType<CreateUserRoleResponse> {
    const UserRoleMockApi = await this.getMockApi();
    if (UserRoleMockApi) {
      return UserRoleMockApi.create(params, true);
    }
    return ApiClient.postJson<CreateUserRoleParams, CreateUserRoleResponse>(`${this.baseUrl}/roles`, params);
  }

  public async show(params: GetUserRoleParams): ReturnType<GetUserRoleResponse> {
    const UserRoleMockApi = await this.getMockApi();
    if (UserRoleMockApi) {
      return UserRoleMockApi.show(params, true);
    }
    return ApiClient.get<GetUserRoleParams, GetUserRoleResponse>(`${this.baseUrl}/roles/${params.id}`, params);
  }

  public async update(params: UpdateUserRoleParams): ReturnType<UpdateUserRoleResponse> {
    const UserRoleMockApi = await this.getMockApi();
    if (UserRoleMockApi) {
      return UserRoleMockApi.update(params, true);
    }
    return ApiClient.put<UpdateUserRoleParams, UpdateUserRoleResponse>(`${this.baseUrl}/roles/${params.id}`, params);
  }

  public async delete(params: DeleteUserRoleParams): ReturnType<DeleteUserRoleResponse> {
    const UserRoleMockApi = await this.getMockApi();
    if (UserRoleMockApi) {
      return UserRoleMockApi.delete(params, true);
    }
    return ApiClient.delete<DeleteUserRoleParams, DeleteUserRoleResponse>(`${this.baseUrl}/roles/${params.id}`, params);
  }
}

export default new UserRoleApi();
