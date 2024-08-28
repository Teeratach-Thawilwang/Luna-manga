import { toast } from "react-toastify";

import { ResponseErrorEnum } from "@enums/ResponseErrorEnum";
import { AxiosResponseError } from "@interfaces/ResponseErrorInterface";
import { RefreshTokenParams, RefreshTokenResponse, SessionTokenParams } from "@interfaces/backoffice/AuthInterface";
import ApiClient from "@repositories/backoffice/ApiClient";
import AuthApi from "@repositories/backoffice/AuthApi";
import CookieService from "@services/backoffice/CookieService";
import SignInService from "@services/backoffice/SignInService";
import { navigateTo, navigateToLoginBackoffice } from "@utils/Helpers";

class AuthService {
  public isLogin(): boolean {
    return CookieService.getIsLogin();
  }

  public isTokenExist(): boolean {
    return CookieService.isTokenExist();
  }

  public isRefreshTokenExist(): boolean {
    return CookieService.isRefreshTokenExist();
  }

  public getAccessToken(): string {
    return CookieService.getAccessToken()!;
  }

  public getRefreshToken(): string {
    return CookieService.getRefreshToken()!;
  }

  public sessionToken(email: string, password: string): void {
    const params: SessionTokenParams = {
      client_id: import.meta.env.VITE_BACKOFFICE_CLIENT_ID,
      email: email,
      password: password,
    };

    AuthApi.sessionToken(params)
      .then((response) => {
        CookieService.setAccessToken(response.access_token, response.access_token_expired_day);
        CookieService.setRefreshToken(response.refresh_token, response.refresh_token_expired_day);
        CookieService.setLoggedIn();
        ApiClient.setAuthToken(response.access_token);
        navigateTo(`/backoffice`, true);
      })
      .catch((e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            this.getTokenThenCallback(() => {
              this.sessionToken(email, password);
            });
            break;
          case ResponseErrorEnum.RESOURCE_NOT_FOUND:
          case ResponseErrorEnum.PASSWORD_INVALID:
            SignInService.update({ loginError: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });
            throw e;
          default:
            toast.error(String(e.data.error));
            throw e;
        }
      });
  }

  public async refreshToken(): Promise<RefreshTokenResponse> {
    const params: RefreshTokenParams = {
      client_id: import.meta.env.VITE_BACKOFFICE_CLIENT_ID,
      refresh_token: this.getRefreshToken(),
    };

    return await AuthApi.refreshToken(params)
      .then((response) => {
        CookieService.setAccessToken(response.access_token, response.access_token_expired_day);
        CookieService.setRefreshToken(response.refresh_token, response.refresh_token_expired_day);
        ApiClient.setAuthToken(response.access_token);
        return response;
      })
      .catch((e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            return this.refreshToken();
          default:
            toast.error(String(e.data.error));
            throw e;
        }
      });
  }

  public logout(): void {
    AuthApi.logout({})
      .then((_response) => {
        CookieService.setLogout();
        navigateToLoginBackoffice();
      })
      .catch((e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            this.getTokenThenCallback(() => {
              this.logout();
            });
            break;
          default:
            toast.error(String(e.data.error));
            throw e;
        }
      });
  }

  public async getTokenThenCallback<T>(callback: () => T) {
    if (this.isRefreshTokenExist()) {
      return this.refreshToken()
        .then((_response) => {
          return callback();
        })
        .catch((e: AxiosResponseError) => {
          toast.error(String(e.data.error));
          throw e;
        });
    }
    CookieService.setLogout();
    navigateToLoginBackoffice();
    return null as T;
  }
}

export default new AuthService();
