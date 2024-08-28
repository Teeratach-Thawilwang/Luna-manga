import {
  CreateProfilePostParams,
  CreateProfilePostResponse,
  DeletePostParams,
  DeletePostResponse,
  ProfilePostParams,
  ProfilePostReactionParams,
  ProfilePostReactionResponse,
  ProfilePostResponse,
} from "@interfaces/frontside/ProfilePostInterface";
import ApiClient from "@repositories/frontside/ApiClient";

type ReturnType<T> = Promise<T>;

class ProfilePostApi {
  private baseUrl = import.meta.env.VITE_FRONT_SIDE_API_URL;

  private async getMockApi() {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      const module = await import("@mocks/frontside/ProfilePostMockApi");
      return module.default;
    }
    return null;
  }

  public async index(params: ProfilePostParams): ReturnType<ProfilePostResponse> {
    const ProfilePostMockApi = await this.getMockApi();
    if (ProfilePostMockApi) {
      return ProfilePostMockApi.index(params, true);
    }
    return ApiClient.get<ProfilePostParams, ProfilePostResponse>(`${this.baseUrl}/posts`, params);
  }

  public async createPost(params: CreateProfilePostParams): ReturnType<CreateProfilePostResponse> {
    const ProfilePostMockApi = await this.getMockApi();
    if (ProfilePostMockApi) {
      return ProfilePostMockApi.createPost(params, true);
    }
    return ApiClient.postJson<CreateProfilePostParams, CreateProfilePostResponse>(`${this.baseUrl}/posts`, params);
  }

  public async delete(params: DeletePostParams): ReturnType<DeletePostResponse> {
    const ProfilePostMockApi = await this.getMockApi();
    if (ProfilePostMockApi) {
      return ProfilePostMockApi.delete(params, true);
    }
    return ApiClient.delete<DeletePostParams, DeletePostResponse>(`${this.baseUrl}/posts/${params.post_id}`, params);
  }

  public async reaction(params: ProfilePostReactionParams): ReturnType<ProfilePostReactionResponse> {
    const ProfilePostMockApi = await this.getMockApi();
    if (ProfilePostMockApi) {
      return ProfilePostMockApi.reaction(params, true);
    }
    return ApiClient.put<ProfilePostReactionParams, ProfilePostReactionResponse>(`${this.baseUrl}/post-reaction/${params.post_id}`, params);
  }
}

export default new ProfilePostApi();
