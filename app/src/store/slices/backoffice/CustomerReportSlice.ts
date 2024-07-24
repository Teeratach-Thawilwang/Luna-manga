import { createSlice } from "@reduxjs/toolkit";

import { CustomerReportSliceInterface } from "@interfaces/backoffice/CustomerReportInterface";

const initialState: CustomerReportSliceInterface = {
  data: null,
  is_loading: false,
  error: "",
};

const slice = createSlice({
  name: "Backoffice.CustomerReportSlice",
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { update } = slice.actions;

export default slice.reducer;
