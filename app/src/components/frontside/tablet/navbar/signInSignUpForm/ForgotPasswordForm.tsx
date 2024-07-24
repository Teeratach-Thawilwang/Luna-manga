import styled from "styled-components";

import ChangePasswordButton from "@components/frontside/tablet/navbar/signInSignUpForm/ChangePasswordButton";
import ForgotPasswordErrorMessage from "@components/frontside/tablet/navbar/signInSignUpForm/ForgotPasswordErrorMessage";
import InputText from "@components/frontside/tablet/navbar/signInSignUpForm/InputText";
import { box } from "@utils/Themes";

export default function ForgotPasswordForm() {
  return (
    <Box>
      <InputText type="email" name="email" placeholder="อีเมล" />
      <ForgotPasswordErrorMessage />
      <ChangePasswordButton />
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
