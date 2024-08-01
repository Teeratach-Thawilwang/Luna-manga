import {
  GetWidgetSequenceParams,
  GetWidgetSequenceResponse,
  UpdateWidgetSequenceParams,
  UpdateWidgetSequenceResponse,
} from "@interfaces/backoffice/WidgetInterface";
// import WidgetSequenceMockApi from "@mocks/backoffice/WidgetSequenceMockApi";
import ApiClient from "@repositories/ApiClient";

type ReturnType<T> = Promise<T>;

class WidgetSequence {
  private baseUrl = import.meta.env.VITE_BACKOFFICE_API_URL;

  private async getMockApi() {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      const module = await import("@mocks/backoffice/WidgetSequenceMockApi");
      return module.default;
    }
    return null;
  }

  public async index(params: GetWidgetSequenceParams): ReturnType<GetWidgetSequenceResponse> {
    const WidgetSequenceMockApi = await this.getMockApi();
    if (WidgetSequenceMockApi) {
      return WidgetSequenceMockApi.index(params, true);
    }
    return ApiClient.get<GetWidgetSequenceParams, GetWidgetSequenceResponse>(`${this.baseUrl}/widget-sequence`, params);
  }

  public async update(params: UpdateWidgetSequenceParams): ReturnType<UpdateWidgetSequenceResponse> {
    const WidgetSequenceMockApi = await this.getMockApi();
    if (WidgetSequenceMockApi) {
      return WidgetSequenceMockApi.update(params, true);
    }
    return ApiClient.put<UpdateWidgetSequenceParams, UpdateWidgetSequenceResponse>(`${this.baseUrl}/widget-sequence`, params);
  }
}

export default new WidgetSequence();
