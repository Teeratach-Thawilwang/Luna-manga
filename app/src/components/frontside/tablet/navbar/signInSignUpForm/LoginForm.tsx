import styled from "styled-components";

import ForgotPasswordButton from "@components/frontside/tablet/navbar/signInSignUpForm/ForgotPasswordButton";
import InputText from "@components/frontside/tablet/navbar/signInSignUpForm/InputText";
import LoginButton from "@components/frontside/tablet/navbar/signInSignUpForm/LoginButton";
import LoginErrorMessage from "@components/frontside/tablet/navbar/signInSignUpForm/LoginErrorMessage";
import { box } from "@utils/Themes";

export default function LoginForm() {
  return (
    <Box>
      <InputText type="email" name="email" placeholder="อีเมล" />
      <InputText type="password" name="password" placeholder="รหัสผ่าน" />
      <LoginErrorMessage />
      <LoginButton />
      <ForgotPasswordButton />
    </Box>
  );
}

const Box = styled.form`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: 0 ${(props) => box(props).space.md};
`;
