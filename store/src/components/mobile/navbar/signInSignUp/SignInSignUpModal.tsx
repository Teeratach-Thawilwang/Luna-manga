import { styled } from "styled-components";

import ForgotPasswordForm from "@components/mobile/navbar/signInSignUp/ForgotPasswordForm";
import LoginForm from "@components/mobile/navbar/signInSignUp/LoginForm";
import RegisterForm from "@components/mobile/navbar/signInSignUp/RegisterForm";
import { SignInSignUpFormStateEnum } from "@enums/SignInSignUpFormStateEnum";
import SignInSignUpService from "@services/SignInSignUpService";
import { box, color } from "@utils/Themes";

export default function SignInSignUpModal({ isShow }: { isShow: boolean }) {
  const selector = SignInSignUpService.getter<SignInSignUpFormStateEnum>("selector");
  if (!isShow) {
    return null;
  }
  return <Box>{getFormElement(selector)}</Box>;
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: calc(100dvh - 60px);
  padding: ${(props) => box(props).space.md} ${(props) => box(props).space.sm};
  padding-top: 0;

  background-color: ${(props) => color(props).surface};

  overflow-y: scroll;
  overflow-x: hidden;

  position: fixed;
  top: 0;

  z-index: ${(props) => box(props).zIndex.modal};

  &::-webkit-scrollbar {
    display: none;
  }
`;

function getFormElement(selector: SignInSignUpFormStateEnum): JSX.Element {
  switch (selector) {
    case SignInSignUpFormStateEnum.LOGIN:
      return <LoginForm />;
    case SignInSignUpFormStateEnum.REGISTER:
      return <RegisterForm />;
    case SignInSignUpFormStateEnum.FORGOT_PASSWORD:
      return <ForgotPasswordForm />;
    default:
      return <LoginForm />;
  }
}
