import React from "react";

import ForgotPasswordForm from "@components/tablet/navbar/signInSignUpForm/ForgotPasswordForm";
import LoginForm from "@components/tablet/navbar/signInSignUpForm/LoginForm";
import RegisterForm from "@components/tablet/navbar/signInSignUpForm/RegisterForm";
import { SignInSignUpFormStateEnum } from "@enums/SignInSignUpFormStateEnum";
import SignInSignUpService from "@services/SignInSignUpService";

export default React.memo(function BodyForm() {
  const selector = SignInSignUpService.getter<SignInSignUpFormStateEnum>("selector");

  switch (selector) {
    case SignInSignUpFormStateEnum.LOGIN:
      return <LoginForm />;
    case SignInSignUpFormStateEnum.REGISTER:
      return <RegisterForm />;
    case SignInSignUpFormStateEnum.FORGOT_PASSWORD:
      return <ForgotPasswordForm />;
  }
});
