import AuthService from "@services/AuthService";
import { navigateTo } from "@utils/Helpers";

export default async function GuestMiddleware(): Promise<boolean> {
  // console.log("In GuestMiddleware");
  const isNotLoggedIn = !AuthService.isLogin();

  if (isNotLoggedIn) {
    return true;
  }

  navigateTo("/");
  return false;
}
