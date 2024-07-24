import { createSlice } from "@reduxjs/toolkit";

import { UserRoleCreateEditSliceInterface } from "@interfaces/backoffice/UserRoleInterface";

const initialState: UserRoleCreateEditSliceInterface = {
  name: null,
  description: null,
  permissions: [],
  users: [],

  name_error_message: "",
  description_error_message: "",
  permissions_error_message: "",
};

const slice = createSlice({
  name: "Backoffice.UserRoleCreateEditSlice",
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { update } = slice.actions;

export default slice.reducer;
