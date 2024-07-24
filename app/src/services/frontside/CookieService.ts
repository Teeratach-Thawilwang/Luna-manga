import Cookies from "js-cookie";

import { ThemeEnum } from "@enums/Theme";

class CookieService {
  private option: Cookies.CookieAttributes;

  constructor() {
    const secure = import.meta.env.VITE_COOKIE_SECURE == "true" ? true : false;
    this.option = { expires: 1, sameSite: "Lax", domain: import.meta.env.VITE_DOMAIN, secure: secure };
  }

  public getIsLogin(): boolean {
    const isLoggedInString = Cookies.get("is_login") ?? false;
    return isLoggedInString === "true" ? true : false;
  }

  public isTokenExist(): boolean {
    return Boolean(Cookies.get("access_token") ?? false);
  }
  public isRefreshTokenExist(): boolean {
    return Boolean(Cookies.get("refresh_token") ?? false);
  }

  public getAccessToken(): string | undefined {
    return Cookies.get("access_token");
  }

  public getRefreshToken(): string | undefined {
    return Cookies.get("refresh_token");
  }

  public setLoggedIn(): void {
    Cookies.set("is_login", "true", this.option);
  }

  public setLogout(): void {
    Cookies.remove("is_login");
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
  }

  public setAccessToken(accessToken: string, expiredDays: number = 1): void {
    this.option.expires = expiredDays;
    Cookies.set("access_token", accessToken, this.option);
  }

  public setRefreshToken(refreshToken: string, expiredDays: number = 7): void {
    this.option.expires = expiredDays;
    Cookies.set("refresh_token", refreshToken, this.option);
  }

  public setTheme(value: ThemeEnum): void {
    Cookies.set("theme", value, this.option);
  }

  public getTheme(): ThemeEnum | null {
    const theme = Cookies.get("theme");
    return theme == undefined ? null : (theme as ThemeEnum);
  }
}

export default new CookieService();
