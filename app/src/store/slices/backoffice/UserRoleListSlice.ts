import { createSlice } from "@reduxjs/toolkit";

import { UserRoleListSliceInterface } from "@interfaces/backoffice/UserRoleInterface";

const initialState: UserRoleListSliceInterface = {
  data: [],
  paginate: null,
  is_loading: false,
  error: "",
};

const slice = createSlice({
  name: "Backoffice.UserRoleListSlice",
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { update } = slice.actions;

export default slice.reducer;
