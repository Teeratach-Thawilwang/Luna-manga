import React from "react";

import ForgotPasswordForm from "@components/frontside/tablet/navbar/signInSignUpForm/ForgotPasswordForm";
import LoginForm from "@components/frontside/tablet/navbar/signInSignUpForm/LoginForm";
import RegisterForm from "@components/frontside/tablet/navbar/signInSignUpForm/RegisterForm";
import { SignInSignUpFormStateEnum } from "@enums/frontside/SignInSignUpFormStateEnum";
import SignInSignUpService from "@services/frontside/SignInSignUpService";

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
