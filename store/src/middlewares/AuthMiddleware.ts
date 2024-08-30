import AuthService from "@services/AuthService";
import { navigateTo } from "@utils/Helpers";

export default async function AuthMiddleware(): Promise<boolean> {
  // console.log("In AuthMiddleware");
  const isLoggedIn = AuthService.isLogin();

  if (isLoggedIn) {
    return true;
  }

  navigateTo("/");
  return false;
}
