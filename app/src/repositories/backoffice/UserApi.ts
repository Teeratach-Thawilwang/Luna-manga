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
import UserMockApi from "@mocks/backoffice/UserMockApi";
import ApiClient from "@repositories/ApiClient";

type ReturnType<T> = Promise<T>;

class UserApi {
  private baseUrl = import.meta.env.VITE_BACKOFFICE_API_URL;

  public async index(params: GetUserListParams): ReturnType<GetUserListResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return UserMockApi.index(params, true);
    }
    return ApiClient.get<GetUserListParams, GetUserListResponse>(`${this.baseUrl}/users`, params);
  }

  public async create(params: CreateUserParams): ReturnType<CreateUserResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return UserMockApi.create(params, true);
    }
    return ApiClient.postJson<CreateUserParams, CreateUserResponse>(`${this.baseUrl}/users`, params);
  }

  public async show(params: GetUserParams): ReturnType<GetUserResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return UserMockApi.show(params, true);
    }
    return ApiClient.get<GetUserParams, GetUserResponse>(`${this.baseUrl}/users/${params.id}`, params);
  }

  public async update(params: UpdateUserParams): ReturnType<UpdateUserResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return UserMockApi.update(params, true);
    }
    return ApiClient.put<UpdateUserParams, UpdateUserResponse>(`${this.baseUrl}/users/${params.id}`, params);
  }
}

export default new UserApi();
