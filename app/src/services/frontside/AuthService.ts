import { ResponseErrorEnum } from "@enums/ResponseErrorEnum";
import { AxiosResponseError } from "@interfaces/ResponseErrorInterface";
import {
  ConfirmEmailParams,
  ForgotPasswordParams,
  RefreshTokenParams,
  RefreshTokenResponse,
  RegisterParams,
  ResetPasswordParams,
  SessionTokenParams,
  TokenParams,
  TokenResponse,
} from "@interfaces/frontside/AuthInterface";
import ApiClient from "@repositories/frontside/ApiClient";
import AuthApi from "@repositories/frontside/AuthApi";
import CookieService from "@services/frontside/CookieService";
import SignInSignUpService from "@services/frontside/SignInSignUpService";
import { navigateTo, reloadPage } from "@utils/Helpers";

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

  public async getToken(): Promise<TokenResponse> {
    //console.log("\tIn AuthService.getToken");
    const params: TokenParams = {
      client_id: import.meta.env.VITE_FRONTSIDE_CLIENT_ID,
    };

    return await AuthApi.token(params)
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
            navigateTo(`/something-went-wrong?data=${JSON.stringify(e.data)}`);
            throw e;
        }
      });
  }

  public async refreshToken(): Promise<RefreshTokenResponse> {
    const params: RefreshTokenParams = {
      client_id: import.meta.env.VITE_FRONTSIDE_CLIENT_ID,
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
            navigateTo(`/something-went-wrong?data=${JSON.stringify(e.data)}`);
            throw e;
        }
      });
  }

  public sessionToken(email: string, password: string): void {
    const params: SessionTokenParams = {
      client_id: import.meta.env.VITE_FRONTSIDE_CLIENT_ID,
      email: email,
      password: password,
    };

    AuthApi.sessionToken(params)
      .then((response) => {
        CookieService.setAccessToken(response.access_token, response.access_token_expired_day);
        CookieService.setRefreshToken(response.refresh_token, response.refresh_token_expired_day);
        CookieService.setLoggedIn();
        reloadPage();
      })
      .catch((e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            this.getTokenThenCallback(() => {
              this.sessionToken(email, password);
            });
            break;
          case ResponseErrorEnum.INACTIVE_ACCOUNT:
            SignInSignUpService.update({ loginError: "กรุณายืนยันอีเมลก่อนเข้าสู่ระบบ" });
            throw e;
          case ResponseErrorEnum.RESOURCE_NOT_FOUND:
          case ResponseErrorEnum.PASSWORD_INVALID:
            SignInSignUpService.update({ loginError: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });
            throw e;
          default:
            navigateTo(`/something-went-wrong?data=${JSON.stringify(e.data)}`);
            throw e;
        }
      });
  }

  public register(email: string, firstName: string, lastName: string, nickName: string, password: string): void {
    const params: RegisterParams = {
      email: email,
      first_name: firstName,
      last_name: lastName,
      nick_name: nickName,
      password: password,
    };

    AuthApi.register(params)
      .then((_response) => {
        SignInSignUpService.clearState();
        navigateTo(`/register-successful`);
      })
      .catch((e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            this.getTokenThenCallback(() => {
              this.register(email, firstName, lastName, nickName, password);
            });
            break;
          case ResponseErrorEnum.VALIDATION_EXCEPTION:
            SignInSignUpService.update({ registerError: "อีเมลถูกใช้งานเเล้ว" });
            throw e;
          default:
            SignInSignUpService.clearState();
            navigateTo(`/something-went-wrong?data=${JSON.stringify(e.data)}`);
            throw e;
        }
      });
  }

  public logout(): void {
    AuthApi.logout({})
      .then((_response) => {
        CookieService.setLogout();
        reloadPage();
      })
      .catch((e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            this.getTokenThenCallback(() => {
              this.logout();
            });
            break;
          default:
            navigateTo(`/something-went-wrong?data=${JSON.stringify(e.data)}`);
            throw e;
        }
      });
  }

  public confirmEmail(
    code: string,
    setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  ): void {
    const params: ConfirmEmailParams = {
      code: code,
    };

    AuthApi.confirmEmail(params)
      .then((_response) => {
        setIsSuccess(true);
        setIsLoading(false);
      })
      .catch((e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            this.getTokenThenCallback(() => {
              this.confirmEmail(code, setIsSuccess, setIsLoading);
            });
            break;
          case ResponseErrorEnum.CONFIRM_EMAIL_INVALID:
            setIsSuccess(false);
            setIsLoading(false);
            break;
          default:
            navigateTo(`/something-went-wrong?data=${JSON.stringify(e.data)}`);
            throw e;
        }
      });
  }

  public forgotPassword(email: string): void {
    const params: ForgotPasswordParams = {
      email: email,
    };

    AuthApi.forgotPassword(params)
      .then((_response) => {
        SignInSignUpService.clearState();
        navigateTo(`/reset-password-processing`);
      })
      .catch((e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            this.getTokenThenCallback(() => {
              this.forgotPassword(email);
            });
            break;
          default:
            SignInSignUpService.clearState();
            navigateTo(`/something-went-wrong?data=${JSON.stringify(e.data)}`);
            throw e;
        }
      });
  }

  public resetPassword(code: string, password: string): void {
    const params: ResetPasswordParams = {
      code: code,
      password: password,
    };

    AuthApi.resetPassword(params)
      .then((_response) => {
        SignInSignUpService.clearState();
        navigateTo(`/reset-password-successful`);
      })
      .catch((e: AxiosResponseError) => {
        console.log(e);
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            this.getTokenThenCallback(() => {
              this.resetPassword(code, password);
            });
            break;
          case ResponseErrorEnum.VALIDATION_EXCEPTION:
            SignInSignUpService.update({ resetPasswordError: e.data.message });
            break;
          default:
            navigateTo(`/something-went-wrong?data=${JSON.stringify(e.data)}`);
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
          navigateTo(`/something-went-wrong?data=${JSON.stringify(e.data)}`);
          throw e;
        });
    }

    return this.getToken()
      .then((_response) => {
        return callback();
      })
      .catch((e: AxiosResponseError) => {
        navigateTo(`/something-went-wrong?data=${JSON.stringify(e.data)}`);
        throw e;
      });
  }
}

export default new AuthService();
