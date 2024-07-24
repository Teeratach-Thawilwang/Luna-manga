import { createSlice } from "@reduxjs/toolkit";

import { ProfileSliceInterface } from "@interfaces/frontside/ProfileInterface";

const initialState: ProfileSliceInterface = {
  data: null,
  is_loading: false,
  error: "",
};

const slice = createSlice({
  name: "Frontside.ProfileSlice",
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { update } = slice.actions;

export default slice.reducer;
