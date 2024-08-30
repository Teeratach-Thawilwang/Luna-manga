import { darken } from "polished";

import { styled } from "styled-components";

import AuthService from "@services/AuthService";
import SignInSignUpService from "@services/SignInSignUpService";
import ValidationService from "@services/ValidationService";
import { box, color, font } from "@utils/Themes";

export default function ChangePasswordButton() {
  const email = SignInSignUpService.getter<string>("email");
  const forgotPasswordError = SignInSignUpService.getter<string>("forgotPasswordError");

  function onClickLogin() {
    const validateEmail = ValidationService.validateEmail(email);
    if (!validateEmail.isSuccess) {
      SignInSignUpService.update({ forgotPasswordError: validateEmail.errorMessage });
      return;
    }

    SignInSignUpService.update({ forgotPasswordError: "" });
    AuthService.forgotPassword(email);
  }

  return (
    <Box $isShortMargin={forgotPasswordError.length != 0} onClick={onClickLogin}>
      ขอเปลี่ยนรหัสผ่าน
    </Box>
  );
}

const Box = styled.div<{ $isShortMargin: boolean }>`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  margin-top: ${(props) => (props.$isShortMargin ? box(props).space.sm : box(props).space.lg)};
  padding: ${(props) => box(props).space.md} 0;
  border-radius: ${(props) => box(props).borderRadius["6xl"]};

  color: ${(props) => color(props).onPrimary};
  background-color: ${(props) => color(props).primary};

  font-size: ${(props) => font(props).size.md};
  font-weight: ${(props) => font(props).weight.bold};
  line-height: ${(props) => font(props).lineHeight.sm};
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
