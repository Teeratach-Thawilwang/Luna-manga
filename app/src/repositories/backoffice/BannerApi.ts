import {
  CreateBannerParams,
  CreateBannerResponse,
  DeleteBannerParams,
  DeleteBannerResponse,
  GetBannerListParams,
  GetBannerListResponse,
  GetBannerParams,
  GetBannerResponse,
  UpdateBannerParams,
  UpdateBannerResponse,
} from "@interfaces/backoffice/BannerInterface";
// import BannerMockApi from "@mocks/backoffice/BannerMockApi";
import ApiClient from "@repositories/ApiClient";

type ReturnType<T> = Promise<T>;

class BannerApi {
  private baseUrl = import.meta.env.VITE_BACKOFFICE_API_URL;

  private async getMockApi() {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      const module = await import("@mocks/backoffice/BannerMockApi");
      return module.default;
    }
    return null;
  }

  public async index(params: GetBannerListParams): ReturnType<GetBannerListResponse> {
    const BannerMockApi = await this.getMockApi();
    if (BannerMockApi) {
      return BannerMockApi.index(params, true);
    }
    return ApiClient.get<GetBannerListParams, GetBannerListResponse>(`${this.baseUrl}/banners`, params);
  }

  public async create(params: CreateBannerParams): ReturnType<CreateBannerResponse> {
    const BannerMockApi = await this.getMockApi();
    if (BannerMockApi) {
      return BannerMockApi.create(params, true);
    }
    return ApiClient.postJson<CreateBannerParams, CreateBannerResponse>(`${this.baseUrl}/banners`, params);
  }

  public async show(params: GetBannerParams): ReturnType<GetBannerResponse> {
    const BannerMockApi = await this.getMockApi();
    if (BannerMockApi) {
      return BannerMockApi.show(params, true);
    }
    return ApiClient.get<GetBannerParams, GetBannerResponse>(`${this.baseUrl}/banners/${params.id}`, params);
  }

  public async update(params: UpdateBannerParams): ReturnType<UpdateBannerResponse> {
    const BannerMockApi = await this.getMockApi();
    if (BannerMockApi) {
      return BannerMockApi.update(params, true);
    }
    return ApiClient.put<UpdateBannerParams, UpdateBannerResponse>(`${this.baseUrl}/banners/${params.id}`, params);
  }

  public async delete(params: DeleteBannerParams): ReturnType<DeleteBannerResponse> {
    const BannerMockApi = await this.getMockApi();
    if (BannerMockApi) {
      return BannerMockApi.delete(params, true);
    }
    return ApiClient.delete<DeleteBannerParams, DeleteBannerResponse>(`${this.baseUrl}/banners/${params.id}`, params);
  }
}

export default new BannerApi();
