import { darken } from "polished";

import { styled } from "styled-components";

import ValidationService from "@services/ValidationService";
import AuthService from "@services/frontside/AuthService";
import SignInSignUpService from "@services/frontside/SignInSignUpService";
import { box, color, font } from "@utils/Themes";

export default function RegisterButton() {
  const { email, firstName, lastName, nickName, password, confirmPassword, registerError } = SignInSignUpService.getState();

  function onClickLogin() {
    const validateEmail = ValidationService.validateEmail(email);
    if (!validateEmail.isSuccess) {
      SignInSignUpService.update({ registerError: validateEmail.errorMessage });
      return;
    }

    const validateFirstName = ValidationService.validateName(firstName, "ชื่อจริง");
    if (!validateFirstName.isSuccess) {
      SignInSignUpService.update({ registerError: validateFirstName.errorMessage });
      return;
    }

    const validateLastName = ValidationService.validateName(lastName, "นามสกุล");
    if (!validateLastName.isSuccess) {
      SignInSignUpService.update({ registerError: validateLastName.errorMessage });
      return;
    }

    const validateNickName = ValidationService.validateName(nickName, "ชื่อเล่น");
    if (!validateNickName.isSuccess) {
      SignInSignUpService.update({ registerError: validateNickName.errorMessage });
      return;
    }

    const validatePassword = ValidationService.validatePasswordAndConfirmPassword(password, confirmPassword);
    if (!validatePassword.isSuccess) {
      SignInSignUpService.update({ registerError: validatePassword.errorMessage });
      return;
    }

    SignInSignUpService.update({ registerError: "" });
    AuthService.register(email, firstName, lastName, nickName, password);
  }
  return (
    <Box $isShortMargin={registerError.length != 0} onClick={onClickLogin}>
      สมัครสมาชิก
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
