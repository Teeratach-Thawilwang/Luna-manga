import { darken } from "polished";

import { useSearchParams } from "react-router-dom";

import { styled } from "styled-components";

import ValidationService from "@services/ValidationService";
import AuthService from "@services/frontside/AuthService";
import SignInSignUpService from "@services/frontside/SignInSignUpService";
import { box, color, font } from "@utils/Themes";

export default function ResetPasswordButton() {
  const [URLSearchParams] = useSearchParams();
  const code = URLSearchParams.get("code");

  const password = SignInSignUpService.getter<string>("password");
  const confirmPassword = SignInSignUpService.getter<string>("confirmPassword");
  const resetPasswordError = SignInSignUpService.getter<string>("resetPasswordError");

  function onClickHandle() {
    const { isSuccess, errorMessage } = ValidationService.validatePasswordAndConfirmPassword(password, confirmPassword);
    if (!isSuccess) {
      SignInSignUpService.update({ resetPasswordError: errorMessage });
    }

    if (code && isSuccess) {
      SignInSignUpService.update({ resetPasswordError: "" });
      AuthService.resetPassword(code, password);
    }
  }

  return (
    <Box $isShortMargin={resetPasswordError.length != 0} onClick={onClickHandle}>
      Reset Password
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
