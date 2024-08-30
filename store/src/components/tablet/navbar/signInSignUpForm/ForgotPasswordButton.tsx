import React from "react";

import styled from "styled-components";

import { SignInSignUpFormStateEnum } from "@enums/SignInSignUpFormStateEnum";
import SignInSignUpService from "@services/SignInSignUpService";
import { box, color, font } from "@utils/Themes";

export default React.memo(function ForgotPasswordButton() {
  function onClickHandle() {
    SignInSignUpService.update({ selector: SignInSignUpFormStateEnum.FORGOT_PASSWORD });
  }
  return <Box onClick={onClickHandle}>ลืมรหัสผ่าน ?</Box>;
});

const Box = styled.div`
  /* border: 1px solid red; */
  width: 100%;
  margin-top: ${(props) => box(props).space.sm};
  padding: 0;

  color: ${(props) => color(props).error};
  background-color: transparent;

  font-size: ${(props) => font(props).size.md};
  font-weight: ${(props) => font(props).weight.regular};
  line-height: ${(props) => font(props).lineHeight.lg};

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;
