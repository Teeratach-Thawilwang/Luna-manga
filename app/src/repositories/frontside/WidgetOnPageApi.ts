import { WidgetOnPageParams, WidgetOnPageResponse } from "@interfaces/frontside/WidgetOnPageInterface";
import ApiClient from "@repositories/ApiClient";

type ReturnType<T> = Promise<T>;

class WidgetOnPageApi {
  private baseUrl = import.meta.env.VITE_FRONT_SIDE_API_URL;

  private async getMockApi() {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      const module = await import("@mocks/frontside/WidgetOnPageMockApi");
      return module.default;
    }
    return null;
  }

  public async index(params: WidgetOnPageParams): ReturnType<WidgetOnPageResponse> {
    const WidgetOnPageMockApi = await this.getMockApi();
    if (WidgetOnPageMockApi) {
      return WidgetOnPageMockApi.index(params, true);
    }
    return ApiClient.get<WidgetOnPageParams, WidgetOnPageResponse>(`${this.baseUrl}/widgets-on-page`, params);
  }
}

export default new WidgetOnPageApi();
