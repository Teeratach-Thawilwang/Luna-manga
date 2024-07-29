import Cookies from "js-cookie";

import { ThemeEnum } from "@enums/Theme";

class CookieService {
  private option: Cookies.CookieAttributes;

  constructor() {
    const secure = import.meta.env.VITE_COOKIE_SECURE == "true" ? true : false;
    this.option = { expires: 1, sameSite: "Lax", domain: import.meta.env.VITE_DOMAIN, secure: secure };
  }

  public getIsLogin(): boolean {
    const isLoggedInString = Cookies.get("is_login_backoffice") ?? false;
    return isLoggedInString === "true" ? true : false;
  }

  public isTokenExist(): boolean {
    return Boolean(Cookies.get("access_token_backoffice") ?? false);
  }
  public isRefreshTokenExist(): boolean {
    return Boolean(Cookies.get("refresh_token_backoffice") ?? false);
  }

  public getAccessToken(): string | undefined {
    return Cookies.get("access_token_backoffice");
  }

  public getRefreshToken(): string | undefined {
    return Cookies.get("refresh_token_backoffice");
  }

  public setLoggedIn(): void {
    Cookies.set("is_login_backoffice", "true", this.option);
  }

  public setLogout(): void {
    Cookies.remove("is_login_backoffice", this.option);
    Cookies.remove("access_token_backoffice", this.option);
    Cookies.remove("refresh_token_backoffice", this.option);
  }

  public setAccessToken(accessToken: string, expiredDays: number = 1): void {
    this.option.expires = expiredDays;
    Cookies.set("access_token_backoffice", accessToken, this.option);
  }

  public setRefreshToken(refreshToken: string, expiredDays: number = 7): void {
    this.option.expires = expiredDays;
    Cookies.set("refresh_token_backoffice", refreshToken, this.option);
  }

  public getVolume(): number {
    return Number(Cookies.get("volume_backoffice") ?? 1);
  }

  public setVolume(value: number): void {
    Cookies.set("volume_backoffice", value.toString(), this.option);
  }

  public setTheme(value: ThemeEnum): void {
    Cookies.set("theme_backoffice", value, this.option);
  }

  public getTheme(): ThemeEnum | null {
    const theme = Cookies.get("theme_backoffice");
    return theme == undefined ? null : (theme as ThemeEnum);
  }
}

export default new CookieService();
