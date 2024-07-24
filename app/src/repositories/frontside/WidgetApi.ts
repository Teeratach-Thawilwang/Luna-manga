import { WidgetIndexParams, WidgetIndexResponse, WidgetsBannersParams, WidgetsBannersResponse } from "@interfaces/frontside/WidgetInterface";
import WidgetMockApi from "@mocks/frontside/WidgetMockApi";
import ApiClient from "@repositories/ApiClient";

type ReturnType<T> = Promise<T>;

class WidgetApi {
  private baseUrl = import.meta.env.VITE_FRONT_SIDE_API_URL;

  public async index(params: WidgetIndexParams): ReturnType<WidgetIndexResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return WidgetMockApi.index(params, true);
    }
    return ApiClient.get<WidgetIndexParams, WidgetIndexResponse>(`${this.baseUrl}/widgets`, params);
  }

  public async widgetBanners(params: WidgetsBannersParams): ReturnType<WidgetsBannersResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return WidgetMockApi.widgetBanners(params, true);
    }

    return ApiClient.get<WidgetsBannersParams, WidgetsBannersResponse>(`${this.baseUrl}/widgets/${params.id}/banners`, params);
  }
}

export default new WidgetApi();
