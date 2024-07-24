import { WidgetOnPageParams, WidgetOnPageResponse } from "@interfaces/frontside/WidgetOnPageInterface";
import WidgetOnPageMockApi from "@mocks/frontside/WidgetOnPageMockApi";
import ApiClient from "@repositories/ApiClient";

type ReturnType<T> = Promise<T>;

class WidgetOnPageApi {
  private baseUrl = import.meta.env.VITE_FRONT_SIDE_API_URL;

  public async index(params: WidgetOnPageParams): ReturnType<WidgetOnPageResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return WidgetOnPageMockApi.index(params, true);
    }
    return ApiClient.get<WidgetOnPageParams, WidgetOnPageResponse>(`${this.baseUrl}/widgets-on-page`, params);
  }
}

export default new WidgetOnPageApi();
