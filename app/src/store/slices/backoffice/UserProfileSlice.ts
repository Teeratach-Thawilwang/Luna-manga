import { createSlice } from "@reduxjs/toolkit";

import { UserProfileSliceInterface } from "@interfaces/backoffice/UserProfileInterface";

const initialState: UserProfileSliceInterface = {
  data: null,
  is_loading: false,
  error: "",
};

const slice = createSlice({
  name: "Backoffice.UserProfileSlice",
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { update } = slice.actions;

export default slice.reducer;
