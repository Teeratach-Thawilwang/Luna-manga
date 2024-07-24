import { createSlice } from "@reduxjs/toolkit";

import { UserRoleSliceInterface } from "@interfaces/backoffice/UserRoleInterface";

const initialState: UserRoleSliceInterface = {
  data: null,
  is_loading: false,
  error: "",
};

const slice = createSlice({
  name: "Backoffice.UserRoleSlice",
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { update } = slice.actions;

export default slice.reducer;
