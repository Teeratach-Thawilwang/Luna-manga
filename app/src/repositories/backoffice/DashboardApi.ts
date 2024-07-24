import { GetDashboardParams, GetDashboardResponse } from "@interfaces/backoffice/DashboardInterface";
import DashboardMockApi from "@mocks/backoffice/DashboardMockApi";
import ApiClient from "@repositories/ApiClient";

type ReturnType<T> = Promise<T>;

class DashboardApi {
  private baseUrl = import.meta.env.VITE_BACKOFFICE_API_URL;

  public async getDashboard(params: GetDashboardParams): ReturnType<GetDashboardResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return DashboardMockApi.getDashboard(params, true);
    }
    return ApiClient.get<GetDashboardParams, GetDashboardResponse>(`${this.baseUrl}/dashboard`, params);
  }
}

export default new DashboardApi();
