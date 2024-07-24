import {
  CreateWidgetParams,
  CreateWidgetResponse,
  DeleteWidgetParams,
  DeleteWidgetResponse,
  GetWidgetListParams,
  GetWidgetListResponse,
  GetWidgetParams,
  GetWidgetResponse,
  UpdateWidgetParams,
  UpdateWidgetResponse,
} from "@interfaces/backoffice/WidgetInterface";
import WidgetMockApi from "@mocks/backoffice/WidgetMockApi";
import ApiClient from "@repositories/ApiClient";

type ReturnType<T> = Promise<T>;

class WidgetApi {
  private baseUrl = import.meta.env.VITE_BACKOFFICE_API_URL;

  public async index(params: GetWidgetListParams): ReturnType<GetWidgetListResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return WidgetMockApi.index(params, true);
    }
    return ApiClient.get<GetWidgetListParams, GetWidgetListResponse>(`${this.baseUrl}/widgets`, params);
  }

  public async create(params: CreateWidgetParams): ReturnType<CreateWidgetResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return WidgetMockApi.create(params, true);
    }
    return ApiClient.postJson<CreateWidgetParams, CreateWidgetResponse>(`${this.baseUrl}/widgets`, params);
  }

  public async show(params: GetWidgetParams): ReturnType<GetWidgetResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return WidgetMockApi.show(params, true);
    }
    return ApiClient.get<GetWidgetParams, GetWidgetResponse>(`${this.baseUrl}/widgets/${params.id}`, params);
  }

  public async update(params: UpdateWidgetParams): ReturnType<UpdateWidgetResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return WidgetMockApi.update(params, true);
    }
    return ApiClient.put<UpdateWidgetParams, UpdateWidgetResponse>(`${this.baseUrl}/widgets/${params.id}`, params);
  }

  public async delete(params: DeleteWidgetParams): ReturnType<DeleteWidgetResponse> {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      return WidgetMockApi.delete(params, true);
    }
    return ApiClient.delete<DeleteWidgetParams, DeleteWidgetResponse>(`${this.baseUrl}/widgets/${params.id}`, params);
  }
}

export default new WidgetApi();
