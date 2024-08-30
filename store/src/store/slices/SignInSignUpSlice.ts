import { createSlice } from "@reduxjs/toolkit";

import { SignInSignUpFormStateEnum } from "@enums/SignInSignUpFormStateEnum";
import { SignInSignUpSliceInterface } from "@interfaces/SignInSignUpInterface";

const initialState: SignInSignUpSliceInterface = {
  isShow: false,
  plane: false,
  box: false,
  selector: SignInSignUpFormStateEnum.LOGIN,
  email: "",
  firstName: "",
  lastName: "",
  nickName: "",
  password: "",
  confirmPassword: "",
  loginError: "",
  registerError: "",
  forgotPasswordError: "",
  resetPasswordError: "",
};

const slice = createSlice({
  name: "Frontside.SignInSignUpSlice",
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { update } = slice.actions;

export default slice.reducer;
