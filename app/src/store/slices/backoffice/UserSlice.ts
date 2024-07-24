import { createSlice } from "@reduxjs/toolkit";

import { UserSliceInterface } from "@interfaces/backoffice/UserInterface";

const initialState: UserSliceInterface = {
  data: null,
  is_loading: false,
  error: "",
};

const slice = createSlice({
  name: "Backoffice.UserSlice",
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { update } = slice.actions;

export default slice.reducer;
