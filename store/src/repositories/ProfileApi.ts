import { ProfileParams, ProfileResponse } from "@interfaces/ProfileInterface";
import ApiClient from "@repositories/ApiClient";

type ReturnType<T> = Promise<T>;

class ProfileApi {
  private baseUrl = import.meta.env.VITE_FRONT_SIDE_API_URL;

  private async getMockApi() {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      const module = await import("@mocks/ProfileMockApi");
      return module.default;
    }
    return null;
  }

  public async getProfile(params: ProfileParams): ReturnType<ProfileResponse> {
    const ProfileMockApi = await this.getMockApi();
    if (ProfileMockApi) {
      return ProfileMockApi.getProfile(params, true);
    }
    return ApiClient.get<ProfileParams, ProfileResponse>(`${this.baseUrl}/profile/${params.id}`, params);
  }
}

export default new ProfileApi();
