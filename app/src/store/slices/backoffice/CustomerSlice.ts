import { createSlice } from "@reduxjs/toolkit";

import { CustomerSliceInterface } from "@interfaces/backoffice/CustomerInterface";

const initialState: CustomerSliceInterface = {
  data: null,
  is_loading: false,
  error: "",
};

const slice = createSlice({
  name: "Backoffice.CustomerSlice",
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { update } = slice.actions;

export default slice.reducer;
