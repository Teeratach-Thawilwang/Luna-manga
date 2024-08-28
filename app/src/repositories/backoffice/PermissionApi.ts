import { GetPermissionListParams, GetPermissionListResponse } from "@interfaces/backoffice/PermissionInterface";
import ApiClient from "@repositories/backoffice/ApiClient";

type ReturnType<T> = Promise<T>;

class PermissionApi {
  private baseUrl = import.meta.env.VITE_BACKOFFICE_API_URL;

  private async getMockApi() {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      const module = await import("@mocks/backoffice/PermissionMockApi");
      return module.default;
    }
    return null;
  }

  public async index(params: GetPermissionListParams): ReturnType<GetPermissionListResponse> {
    const PermissionMockApi = await this.getMockApi();
    if (PermissionMockApi) {
      return PermissionMockApi.index(params, true);
    }
    return ApiClient.get<GetPermissionListParams, GetPermissionListResponse>(`${this.baseUrl}/permissions`, params);
  }
}

export default new PermissionApi();
