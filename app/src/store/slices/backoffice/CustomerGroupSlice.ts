import { createSlice } from "@reduxjs/toolkit";

import { CustomerGroupSliceInterface } from "@interfaces/backoffice/CustomerGroupInterface";

const initialState: CustomerGroupSliceInterface = {
  data: null,
  is_loading: false,
  error: "",
};

const slice = createSlice({
  name: "Backoffice.CustomerGroupSlice",
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { update } = slice.actions;

export default slice.reducer;
