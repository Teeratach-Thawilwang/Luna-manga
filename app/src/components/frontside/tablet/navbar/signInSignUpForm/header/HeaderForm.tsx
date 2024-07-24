import React from "react";

import styled from "styled-components";

import ForgotPasswordHeaderForm from "@components/frontside/tablet/navbar/signInSignUpForm/header/ForgotPasswordHeaderForm";
import { SignInSignUpFormStateEnum } from "@enums/frontside/SignInSignUpFormStateEnum";
import SignInSignUpService from "@services/frontside/SignInSignUpService";
import { box } from "@utils/Themes";

import HeaderFormSelector from "./HeaderFormSelector";

export default React.memo(function HeaderForm() {
  const selector = SignInSignUpService.getter<SignInSignUpFormStateEnum>("selector");

  if (selector === SignInSignUpFormStateEnum.FORGOT_PASSWORD) {
    return (
      <Box>
        <ForgotPasswordHeaderForm />
      </Box>
    );
  }

  return (
    <Box>
      <HeaderFormSelector selector={SignInSignUpFormStateEnum.LOGIN}>Login</HeaderFormSelector>
      <HeaderFormSelector selector={SignInSignUpFormStateEnum.REGISTER}>Register</HeaderFormSelector>
    </Box>
  );
});

const Box = React.memo(styled.div`
  /* border: 1px solid red; */
  width: 100%;
  margin-bottom: ${(props) => box(props).space.md};

  display: flex;
  justify-content: center;
  align-items: center;
`);
