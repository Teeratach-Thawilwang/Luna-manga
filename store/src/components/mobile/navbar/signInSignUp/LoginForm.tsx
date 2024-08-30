import { darken } from "polished";

import styled from "styled-components";

import Logo from "@components/mobile/Logo";
import ForgotPasswordButton from "@components/mobile/navbar/signInSignUp/ForgotPasswordButton";
import InputText from "@components/mobile/navbar/signInSignUp/InputText";
import LoginButton from "@components/mobile/navbar/signInSignUp/LoginButton";
import LoginErrorMessage from "@components/mobile/navbar/signInSignUp/LoginErrorMessage";
import { SignInSignUpFormStateEnum } from "@enums/SignInSignUpFormStateEnum";
import SignInSignUpService from "@services/SignInSignUpService";
import { box, color, font } from "@utils/Themes";

export default function LoginForm() {
  return (
    <Box>
      <LogoBox>
        <Logo />
      </LogoBox>
      <InputText type="email" name="email" placeholder="อีเมล" />
      <InputText type="password" name="password" placeholder="รหัสผ่าน" />
      <LoginErrorMessage />
      <LoginButton />
      <ForgotPasswordButton />
      <CreateAccountButton onClick={() => SignInSignUpService.update({ selector: SignInSignUpFormStateEnum.REGISTER })}>
        สมัครสมาชิก
      </CreateAccountButton>
    </Box>
  );
}

const Box = styled.form`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: ${(props) => box(props).space.md};

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

const LogoBox = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: fit-content;
`;

const CreateAccountButton = styled.div`
  box-sizing: border-box;
  width: 100%;
  margin-top: auto;
  margin-bottom: ${(props) => box(props).space.lg};
  padding: ${(props) => box(props).space.md} 0;

  border: 1px solid ${(props) => color(props).primary};
  border-radius: ${(props) => box(props).borderRadius["6xl"]};
  color: ${(props) => color(props).primary};
  background-color: transparent;

  font-size: ${(props) => font(props).size.md};
  font-weight: ${(props) => font(props).weight.bold};
  line-height: ${(props) => font(props).lineHeight.sm};
  font-family: Inter;
  text-align: center;

  &:hover {
    cursor: pointer;
    color: ${(props) => darken(1 - font(props).opacity.hover, color(props).primary)};
  }

  &:active {
    color: ${(props) => darken(1 - font(props).opacity.active, color(props).primary)};
  }
`;
