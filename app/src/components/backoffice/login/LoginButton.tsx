import styled from "styled-components";

import ValidationService from "@services/ValidationService";
import AuthService from "@services/backoffice/AuthService";
import SignInService from "@services/backoffice/SignInService";

export default function LoginButton() {
  const email = SignInService.getter<string>("email");
  const password = SignInService.getter<string>("password");

  function onClickHandle() {
    const validateEmail = ValidationService.validateEmail(email);
    if (!validateEmail.isSuccess) {
      SignInService.update({ loginError: validateEmail.errorMessage });
      return;
    }

    const validatePassword = ValidationService.validatePassword(password);
    if (!validatePassword.isSuccess) {
      SignInService.update({ loginError: validatePassword.errorMessage });
      return;
    }

    SignInService.update({ loginError: "" });
    AuthService.sessionToken(email, password);
  }
  return <Box onClick={onClickHandle}>Login</Box>;
}

const Box = styled.div`
  width: 285px;
  height: 50px;
  margin: 0 20px 20px 20px;
  padding: 0;

  font-size: 20px;
  font-weight: normal;
  /* font-family: Kanit; */

  border: 0 transparent;
  border-radius: 5px;

  color: #ffffff;
  background-color: #000000;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }

  &:active {
    opacity: 1;
  }
`;
