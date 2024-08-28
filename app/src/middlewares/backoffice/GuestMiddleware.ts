import ApiClient from "@repositories/backoffice/ApiClient";
import AuthService from "@services/backoffice/AuthService";
import CookieService from "@services/backoffice/CookieService";
import UserProfileService from "@services/backoffice/UserProfileService";
import store from "@store/Store";
import { navigateTo } from "@utils/Helpers";

export default async function GuestMiddleware(): Promise<boolean> {
  const isTokenExist = AuthService.isTokenExist();
  const isLoggedin = AuthService.isLogin();

  if (!isTokenExist) {
    CookieService.setLogout();
    return true;
  }

  ApiClient.setAuthToken(AuthService.getAccessToken());
  const userProfile = store.getState().backoffice.userProfile.data;

  if (isLoggedin && userProfile == null) {
    return await UserProfileService.loadProfile()
      .then(() => {
        CookieService.setLoggedIn();
        navigateTo(`/backoffice`);
        return false;
      })
      .catch(() => {
        CookieService.setLogout();
        return true;
      });
  }

  CookieService.setLogout();
  return true;
}
