import {
  UpdateUserProfileParams,
  UpdateUserProfileResponse,
  UserProfileParams,
  UserProfileResponse,
} from "@interfaces/backoffice/UserProfileInterface";
import ApiClient from "@repositories/ApiClient";

type ReturnType<T> = Promise<T>;

class UserProfileApi {
  private baseUrl = import.meta.env.VITE_BACKOFFICE_API_URL;

  private async getMockApi() {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      const module = await import("@mocks/backoffice/UserProfileMockApi");
      return module.default;
    }
    return null;
  }

  public async show(params: UserProfileParams): ReturnType<UserProfileResponse> {
    const UserProfileMockApi = await this.getMockApi();
    if (UserProfileMockApi) {
      return UserProfileMockApi.show(params, true);
    }
    return ApiClient.get<UserProfileParams, UserProfileResponse>(`${this.baseUrl}/user-profile`, params);
  }

  public async update(params: UpdateUserProfileParams): ReturnType<UpdateUserProfileResponse> {
    const UserProfileMockApi = await this.getMockApi();
    if (UserProfileMockApi) {
      return UserProfileMockApi.update(params, true);
    }
    return ApiClient.put<UpdateUserProfileParams, UpdateUserProfileResponse>(`${this.baseUrl}/user-profile/${params.id}`, params);
  }
}

export default new UserProfileApi();
