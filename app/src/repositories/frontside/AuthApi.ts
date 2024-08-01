import {
  ConfirmEmailParams,
  ConfirmEmailResponse,
  ForgotPasswordParams,
  ForgotPasswordResponse,
  LogoutParams,
  LogoutResponse,
  RefreshTokenParams,
  RefreshTokenResponse,
  RegisterParams,
  RegisterResponse,
  ResetPasswordParams,
  ResetPasswordResponse,
  SessionTokenParams,
  SessionTokenResponse,
  TokenParams,
  TokenResponse,
} from "@interfaces/frontside/AuthInterface";
// import AuthMockApi from "@mocks/frontside/AuthMockApi";
import ApiClient from "@repositories/ApiClient";

type ReturnType<T> = Promise<T>;

class AuthApi {
  private baseUrl = import.meta.env.VITE_FRONT_SIDE_API_URL;

  private async getMockApi() {
    if (import.meta.env.VITE_IS_MOCK_DATA === "true") {
      const module = await import("@mocks/frontside/AuthMockApi");
      return module.default;
    }
    return null;
  }

  public async token(params: TokenParams): ReturnType<TokenResponse> {
    const AuthMockApi = await this.getMockApi();
    if (AuthMockApi) {
      return AuthMockApi.token(params, true);
    }
    return ApiClient.postJson<TokenParams, TokenResponse>(`${this.baseUrl}/token`, params);
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

  public async register(params: RegisterParams): ReturnType<RegisterResponse> {
    const AuthMockApi = await this.getMockApi();
    if (AuthMockApi) {
      return AuthMockApi.register(params, true);
    }
    return ApiClient.postJson<RegisterParams, RegisterResponse>(`${this.baseUrl}/register`, params);
  }

  public async confirmEmail(params: ConfirmEmailParams): ReturnType<ConfirmEmailResponse> {
    const AuthMockApi = await this.getMockApi();
    if (AuthMockApi) {
      return AuthMockApi.confirmEmail(params, true);
    }
    return ApiClient.postJson<ConfirmEmailParams, ConfirmEmailResponse>(`${this.baseUrl}/confirm-register-email`, params);
  }

  public async forgotPassword(params: ForgotPasswordParams): ReturnType<ForgotPasswordResponse> {
    const AuthMockApi = await this.getMockApi();
    if (AuthMockApi) {
      return AuthMockApi.forgotPassword(params, true);
    }
    return ApiClient.postJson<ForgotPasswordParams, ForgotPasswordResponse>(`${this.baseUrl}/forgot-password`, params);
  }

  public async resetPassword(params: ResetPasswordParams): ReturnType<ResetPasswordResponse> {
    const AuthMockApi = await this.getMockApi();
    if (AuthMockApi) {
      return AuthMockApi.resetPassword(params, true);
    }
    return ApiClient.postJson<ResetPasswordParams, ResetPasswordResponse>(`${this.baseUrl}/reset-password`, params);
  }
}

export default new AuthApi();
