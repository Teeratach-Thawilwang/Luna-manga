import { createSlice } from "@reduxjs/toolkit";

import { CustomerProfileSliceInterface } from "@interfaces/CustomerProfileInterface";

const initialState: CustomerProfileSliceInterface = {
  data: null,
  is_loading: false,
  error: "",
};

const slice = createSlice({
  name: "Frontside.CustomerProfileSlice",
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { update } = slice.actions;

export default slice.reducer;
