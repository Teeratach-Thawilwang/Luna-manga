import { createSlice } from "@reduxjs/toolkit";

import { UserCreateEditSliceInterface } from "@interfaces/backoffice/UserInterface";

const initialState: UserCreateEditSliceInterface = {
  email: null,
  password: null,
  nick_name: null,
  first_name: null,
  last_name: null,
  status: null,

  email_error_message: "",
  password_error_message: "",
  nick_name_error_message: "",
  first_name_error_message: "",
  last_name_error_message: "",
};

const slice = createSlice({
  name: "Backoffice.UserCreateEditSlice",
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { update } = slice.actions;

export default slice.reducer;
