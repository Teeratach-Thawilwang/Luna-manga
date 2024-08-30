import MenuButton from "@components/mobile/navbar/MenuButton";
import SignInButton from "@components/mobile/navbar/SignInButton";
import { NavigationModelEnum } from "@enums/NavigationModelEnum";
import AuthService from "@services/AuthService";
import CustomerProfileService from "@services/CustomerProfileService";

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
