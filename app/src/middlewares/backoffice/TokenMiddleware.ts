import ApiClient from "@repositories/ApiClient";
import AuthService from "@services/backoffice/AuthService";
import CookieService from "@services/backoffice/CookieService";
import UserProfileService from "@services/backoffice/UserProfileService";
import store from "@store/Store";
import { navigateToLoginBackoffice } from "@utils/Helpers";

export default async function TokenMiddleware(): Promise<boolean> {
  const isTokenExist = AuthService.isTokenExist();

  if (!isTokenExist) {
    CookieService.setLogout();
    navigateToLoginBackoffice();
    return false;
  }

  ApiClient.setAuthToken(AuthService.getAccessToken());
  const userProfile = store.getState().backoffice.userProfile.data;

  if (userProfile == null) {
    return await UserProfileService.loadProfile()
      .then(() => {
        CookieService.setLoggedIn();
        return true;
      })
      .catch(() => {
        CookieService.setLogout();
        navigateToLoginBackoffice();
        return false;
      });
  }

  return true;
}
