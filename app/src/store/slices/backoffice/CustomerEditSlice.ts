import { createSlice } from "@reduxjs/toolkit";

import { CustomerEditSliceInterface } from "@interfaces/backoffice/CustomerInterface";

const initialState: CustomerEditSliceInterface = {
  email: null,
  nick_name: null,
  first_name: null,
  last_name: null,
  status: null,
  profile_image: null,
  customer_group: null,

  email_error_message: "",
  nick_name_error_message: "",
  first_name_error_message: "",
  last_name_error_message: "",
  profile_image_error_message: "",
  customer_group_error_message: "",
};

const slice = createSlice({
  name: "Backoffice.CustomerEditSlice",
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { update } = slice.actions;

export default slice.reducer;
