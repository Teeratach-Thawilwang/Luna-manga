import {
  LogoutParams,
  LogoutResponse,
  RefreshTokenParams,
  RefreshTokenResponse,
  SessionTokenParams,
  SessionTokenResponse,
} from "@interfaces/backoffice/AuthInterface";
// import AuthMockApi from "@mocks/backoffice/AuthMockApi";
import ApiClient from "@repositories/ApiClient";

type ReturnType<T> = Promise<T>;

class AuthApi {
  private baseUrl = import.meta.env.VITE_BACKOFFICE_API_URL;

  private async getMockApi() {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      const module = await import("@mocks/backoffice/AuthMockApi");
      return module.default;
    }
    return null;
  }

  public async sessionToken(params: SessionTokenParams): ReturnType<SessionTokenResponse> {
    const AuthMockApi = await this.getMockApi();
    if (AuthMockApi) {
      return AuthMockApi.sessionToken(params, true);
    }
    return ApiClient.postJson<SessionTokenParams, SessionTokenResponse>(`${this.baseUrl}/session`, params);
  }

  public async refreshToken(params: RefreshTokenParams): ReturnType<RefreshTokenResponse> {
    const AuthMockApi = await this.getMockApi();
    if (AuthMockApi) {
      return AuthMockApi.refreshToken(params, true);
    }
    return ApiClient.postJson<RefreshTokenParams, RefreshTokenResponse>(`${this.baseUrl}/session-refresh`, params);
  }

  public async logout(params: LogoutParams): ReturnType<LogoutResponse> {
    const AuthMockApi = await this.getMockApi();
    if (AuthMockApi) {
      return AuthMockApi.logout(params, true);
    }
    return ApiClient.delete<LogoutParams, LogoutResponse>(`${this.baseUrl}/session`, params);
  }
}

export default new AuthApi();
