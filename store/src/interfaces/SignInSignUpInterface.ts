export interface SignInSignUpSliceInterface {
  [key: string]: any;
  isShow: boolean;
  plane: boolean;
  box: boolean;
  selector: string;
  email: string;
  firstName: string;
  lastName: string;
  nickName: string;
  password: string;
  confirmPassword: string;
  loginError: string;
  registerError: string;
  forgotPasswordError: string;
  resetPasswordError: string;
}

export interface SignFormButtonPropsInterface {
  $bgColor: string;
  $marginBottom?: string;
  $onClick?: () => void;
}
