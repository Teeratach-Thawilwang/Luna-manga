import MenuButton from "@components/frontside/mobile/navbar/MenuButton";
import SignInButton from "@components/frontside/mobile/navbar/SignInButton";
import { NavigationModelEnum } from "@enums/frontside/NavigationModelEnum";
import AuthService from "@services/frontside/AuthService";
import CustomerProfileService from "@services/frontside/CustomerProfileService";

interface GroupButtonInterface {
  isActive: boolean;
  setActive: (value: NavigationModelEnum) => void;
}

export default function GroupButton({ isActive, setActive }: GroupButtonInterface) {
  const isLoggedIn = CustomerProfileService.isLoggedIn() && AuthService.isLogin();
  if (isLoggedIn) {
    return <MenuButton isActive={isActive} setActive={setActive} />;
  }
  return <SignInButton isActive={isActive} setActive={setActive} />;
}
