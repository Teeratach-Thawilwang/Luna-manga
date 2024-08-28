import {
  CreateUserParams,
  CreateUserResponse,
  GetUserListParams,
  GetUserListResponse,
  GetUserParams,
  GetUserResponse,
  UpdateUserParams,
  UpdateUserResponse,
} from "@interfaces/backoffice/UserInterface";
import ApiClient from "@repositories/backoffice/ApiClient";

type ReturnType<T> = Promise<T>;

class UserApi {
  private baseUrl = import.meta.env.VITE_BACKOFFICE_API_URL;

  private async getMockApi() {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      const module = await import("@mocks/backoffice/UserMockApi");
      return module.default;
    }
    return null;
  }

  public async index(params: GetUserListParams): ReturnType<GetUserListResponse> {
    const UserMockApi = await this.getMockApi();
    if (UserMockApi) {
      return UserMockApi.index(params, true);
    }
    return ApiClient.get<GetUserListParams, GetUserListResponse>(`${this.baseUrl}/users`, params);
  }

  public async create(params: CreateUserParams): ReturnType<CreateUserResponse> {
    const UserMockApi = await this.getMockApi();
    if (UserMockApi) {
      return UserMockApi.create(params, true);
    }
    return ApiClient.postJson<CreateUserParams, CreateUserResponse>(`${this.baseUrl}/users`, params);
  }

  public async show(params: GetUserParams): ReturnType<GetUserResponse> {
    const UserMockApi = await this.getMockApi();
    if (UserMockApi) {
      return UserMockApi.show(params, true);
    }
    return ApiClient.get<GetUserParams, GetUserResponse>(`${this.baseUrl}/users/${params.id}`, params);
  }

  public async update(params: UpdateUserParams): ReturnType<UpdateUserResponse> {
    const UserMockApi = await this.getMockApi();
    if (UserMockApi) {
      return UserMockApi.update(params, true);
    }
    return ApiClient.put<UpdateUserParams, UpdateUserResponse>(`${this.baseUrl}/users/${params.id}`, params);
  }
}

export default new UserApi();
