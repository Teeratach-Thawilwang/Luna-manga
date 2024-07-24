import styled from "styled-components";

import SignInService from "@services/backoffice/SignInService";

export default function LoginErrorMessage() {
  const loginError = SignInService.getter<string>("loginError");
  if (loginError.length == 0) {
    return <></>;
  }
  return <Box>{loginError}</Box>;
}

const Box = styled.div`
  /* border: 1px solid red; */
  width: 285px;
  color: #ff0000;
  margin: -10px 20px 10px 20px;
  padding: 0;
  text-align: center;
`;
