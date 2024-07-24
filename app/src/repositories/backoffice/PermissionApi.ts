import { GetPermissionListParams, GetPermissionListResponse } from "@interfaces/backoffice/PermissionInterface";
import PermissionMockApi from "@mocks/backoffice/PermissionMockApi";
import ApiClient from "@repositories/ApiClient";

type ReturnType<T> = Promise<T>;

class PermissionApi {
  private baseUrl = import.meta.env.VITE_BACKOFFICE_API_URL;

  public async index(params: GetPermissionListParams): ReturnType<GetPermissionListResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return PermissionMockApi.index(params, true);
    }
    return ApiClient.get<GetPermissionListParams, GetPermissionListResponse>(`${this.baseUrl}/permissions`, params);
  }
}

export default new PermissionApi();
