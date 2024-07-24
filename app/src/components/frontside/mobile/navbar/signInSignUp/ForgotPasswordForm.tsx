import styled from "styled-components";

import ChangePasswordButton from "@components/frontside/mobile/navbar/signInSignUp/ChangePasswordButton";
import ForgotPasswordErrorMessage from "@components/frontside/mobile/navbar/signInSignUp/ForgotPasswordErrorMessage";
import InputText from "@components/frontside/mobile/navbar/signInSignUp/InputText";
import LogoWithBackButton from "@components/frontside/mobile/navbar/signInSignUp/LogoWithBackButton";
import { box } from "@utils/Themes";

export default function ForgotPasswordForm() {
  return (
    <Box>
      <LogoWithBackButton />
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
  height: fit-content;
  margin: 0;
  padding: ${(props) => box(props).space.md};
`;
