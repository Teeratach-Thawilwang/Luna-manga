import { ResponseErrorEnum } from "@enums/ResponseErrorEnum";
import { AxiosResponseError } from "@interfaces/ResponseErrorInterface";
import ApiClient from "@repositories/frontside/ApiClient";
import AuthService from "@services/frontside/AuthService";
import CookieService from "@services/frontside/CookieService";
import CustomerProfileService from "@services/frontside/CustomerProfileService";
import store from "@store/Store";

export default async function TokenMiddleware(): Promise<boolean> {
  const isTokenExist = AuthService.isTokenExist();
  const isLoggedin = AuthService.isLogin();

  if (!isTokenExist) {
    CookieService.setLogout();
    return await AuthService.getToken()
      .then(() => true)
      .catch(() => false);
  }
  ApiClient.setAuthToken(AuthService.getAccessToken());

  const customerProfile = store.getState().frontside.customerProfile.data;
  if (isLoggedin && customerProfile == null) {
    return await CustomerProfileService.loadProfile()
      .then(() => {
        CookieService.setLoggedIn();
        return true;
      })
      .catch((e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.RESOURCE_NOT_FOUND:
            CookieService.setLogout();
            AuthService.getTokenThenCallback(() => {});
            return true;
          default:
            return false;
        }
      });
  }

  return true;
}
