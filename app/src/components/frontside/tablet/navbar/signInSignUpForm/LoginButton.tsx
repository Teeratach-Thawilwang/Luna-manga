﻿import { darken } from "polished";

import { styled } from "styled-components";

import ValidationService from "@services/ValidationService";
import AuthService from "@services/frontside/AuthService";
import SignInSignUpService from "@services/frontside/SignInSignUpService";
import { box, color, font } from "@utils/Themes";

export default function LoginButton() {
  const email = SignInSignUpService.getter<string>("email");
  const password = SignInSignUpService.getter<string>("password");
  const loginError = SignInSignUpService.getter<string>("loginError");

  function onClickLogin() {
    const validateEmail = ValidationService.validateEmail(email);
    if (!validateEmail.isSuccess) {
      SignInSignUpService.update({ loginError: validateEmail.errorMessage });
      return;
    }

    const validatePassword = ValidationService.validatePassword(password);
    if (!validatePassword.isSuccess) {
      SignInSignUpService.update({ loginError: validatePassword.errorMessage });
      return;
    }

    SignInSignUpService.update({ loginError: "" });
    AuthService.sessionToken(email, password);
  }

  return (
    <Box $isShortMargin={loginError.length != 0} onClick={onClickLogin}>
      Login
    </Box>
  );
}

const Box = styled.div<{ $isShortMargin: boolean }>`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  margin-top: ${(props) => (props.$isShortMargin ? box(props).space.sm : box(props).space.lg)};
  padding: ${(props) => box(props).space.sm} 0;
  border-radius: ${(props) => box(props).borderRadius.md};

  color: ${(props) => color(props).onPrimary};
  background-color: ${(props) => color(props).primary};

  font-size: ${(props) => font(props).size.md};
  font-weight: ${(props) => font(props).weight.bold};
  line-height: ${(props) => font(props).lineHeight.md};
  font-family: Inter;
  text-align: center;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => darken(1 - font(props).opacity.hover, color(props).primary)};
  }

  &:active {
    background-color: ${(props) => darken(1 - font(props).opacity.active, color(props).primary)};
  }
`;
