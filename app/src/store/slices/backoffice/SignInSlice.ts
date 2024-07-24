import { createSlice } from "@reduxjs/toolkit";

import { SignInSliceInterface } from "@interfaces/backoffice/SignInInterface";

const initialState: SignInSliceInterface = {
  email: "",
  password: "",
  loginError: "",
};

const slice = createSlice({
  name: "Backoffice.SignInSlice",
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { update } = slice.actions;

export default slice.reducer;
