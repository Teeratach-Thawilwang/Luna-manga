import { ProfileParams, ProfileResponse } from "@interfaces/frontside/ProfileInterface";
import ProfileMockApi from "@mocks/frontside/ProfileMockApi";
import ApiClient from "@repositories/ApiClient";

type ReturnType<T> = Promise<T>;

class ProfileApi {
  private baseUrl = import.meta.env.VITE_FRONT_SIDE_API_URL;

  public async getProfile(params: ProfileParams): ReturnType<ProfileResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return ProfileMockApi.getProfile(params, true);
    }
    return ApiClient.get<ProfileParams, ProfileResponse>(`${this.baseUrl}/profile/${params.id}`, params);
  }
}

export default new ProfileApi();
