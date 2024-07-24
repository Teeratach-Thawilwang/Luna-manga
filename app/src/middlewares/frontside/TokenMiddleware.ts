import ApiClient from "@repositories/ApiClient";
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
      .catch(() => {
        CookieService.setLogout();
        return false;
      });
  }

  return true;
}
