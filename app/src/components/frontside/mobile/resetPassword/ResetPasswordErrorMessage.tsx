import styled from "styled-components";

import SignInSignUpService from "@services/frontside/SignInSignUpService";
import { box, color } from "@utils/Themes";

export default function ResetPasswordErrorMessage() {
  const resetPasswordError = SignInSignUpService.getter<string>("resetPasswordError");
  if (resetPasswordError.length == 0) {
    return <></>;
  }
  return <Box>{resetPasswordError}</Box>;
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  margin-top: ${(props) => box(props).space.sm};
  padding: 0;

  color: ${(props) => color(props).error};
  text-align: center;
`;
