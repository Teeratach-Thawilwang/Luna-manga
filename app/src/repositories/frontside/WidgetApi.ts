import { WidgetIndexParams, WidgetIndexResponse, WidgetsBannersParams, WidgetsBannersResponse } from "@interfaces/frontside/WidgetInterface";
import ApiClient from "@repositories/frontside/ApiClient";

type ReturnType<T> = Promise<T>;

class WidgetApi {
  private baseUrl = import.meta.env.VITE_FRONT_SIDE_API_URL;

  private async getMockApi() {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      const module = await import("@mocks/frontside/WidgetMockApi");
      return module.default;
    }
    return null;
  }

  public async index(params: WidgetIndexParams): ReturnType<WidgetIndexResponse> {
    const WidgetMockApi = await this.getMockApi();
    if (WidgetMockApi) {
      return WidgetMockApi.index(params, true);
    }
    return ApiClient.get<WidgetIndexParams, WidgetIndexResponse>(`${this.baseUrl}/widgets`, params);
  }

  public async widgetBanners(params: WidgetsBannersParams): ReturnType<WidgetsBannersResponse> {
    const WidgetMockApi = await this.getMockApi();
    if (WidgetMockApi) {
      return WidgetMockApi.widgetBanners(params, true);
    }

    return ApiClient.get<WidgetsBannersParams, WidgetsBannersResponse>(`${this.baseUrl}/widgets/${params.id}/banners`, params);
  }
}

export default new WidgetApi();
