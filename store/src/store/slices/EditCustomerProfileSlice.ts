import { createSlice } from "@reduxjs/toolkit";

import { EditCustomerProfileSliceInterface } from "@interfaces/EditCustomerProfileInterface";

const initialState: EditCustomerProfileSliceInterface = {
  id: 0,
  firstName: "",
  lastName: "",
  nickName: "",
  email: "",
  editProfileError: "",
};

const slice = createSlice({
  name: "Frontside.EditCustomerProfileSlice",
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { update } = slice.actions;

export default slice.reducer;
