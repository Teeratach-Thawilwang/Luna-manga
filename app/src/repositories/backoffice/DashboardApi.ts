import { GetDashboardParams, GetDashboardResponse } from "@interfaces/backoffice/DashboardInterface";
import ApiClient from "@repositories/ApiClient";

type ReturnType<T> = Promise<T>;

class DashboardApi {
  private baseUrl = import.meta.env.VITE_BACKOFFICE_API_URL;

  private async getMockApi() {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      const module = await import("@mocks/backoffice/DashboardMockApi");
      return module.default;
    }
    return null;
  }

  public async getDashboard(params: GetDashboardParams): ReturnType<GetDashboardResponse> {
    const DashboardMockApi = await this.getMockApi();
    if (DashboardMockApi) {
      return DashboardMockApi.getDashboard(params, true);
    }
    return ApiClient.get<GetDashboardParams, GetDashboardResponse>(`${this.baseUrl}/dashboard`, params);
  }
}

export default new DashboardApi();
