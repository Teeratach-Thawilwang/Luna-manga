import { createSlice } from "@reduxjs/toolkit";

import { CustomerReportListSliceInterface } from "@interfaces/backoffice/CustomerReportInterface";

const initialState: CustomerReportListSliceInterface = {
  data: [],
  paginate: null,
  filter: null,
  is_loading: false,
  error: "",
};

const slice = createSlice({
  name: "Backoffice.CustomerReportListSlice",
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      return { ...state, ...action.payload };
    },

    updateFilter: (state, action) => {
      return { ...state, filter: { ...state.filter, ...action.payload } };
    },
  },
});

export const { update, updateFilter } = slice.actions;

export default slice.reducer;
