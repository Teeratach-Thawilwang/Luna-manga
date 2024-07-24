import {
  UpdateUserProfileParams,
  UpdateUserProfileResponse,
  UserProfileParams,
  UserProfileResponse,
} from "@interfaces/backoffice/UserProfileInterface";
import UserProfileMockApi from "@mocks/backoffice/UserProfileMockApi";
import ApiClient from "@repositories/ApiClient";

type ReturnType<T> = Promise<T>;

class UserProfileApi {
  private baseUrl = import.meta.env.VITE_BACKOFFICE_API_URL;

  public async show(params: UserProfileParams): ReturnType<UserProfileResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return UserProfileMockApi.show(params, true);
    }
    return ApiClient.get<UserProfileParams, UserProfileResponse>(`${this.baseUrl}/user-profile`, params);
  }

  public async update(params: UpdateUserProfileParams): ReturnType<UpdateUserProfileResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return UserProfileMockApi.update(params, true);
    }
    return ApiClient.put<UpdateUserProfileParams, UpdateUserProfileResponse>(`${this.baseUrl}/user-profile/${params.id}`, params);
  }
}

export default new UserProfileApi();
