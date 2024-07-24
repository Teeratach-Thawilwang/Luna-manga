import { createSlice } from "@reduxjs/toolkit";

import { CustomerListSliceInterface } from "@interfaces/backoffice/CustomerInterface";

const initialState: CustomerListSliceInterface = {
  data: [],
  paginate: null,
  filter: null,
  is_loading: false,
  error: "",
};

const slice = createSlice({
  name: "Backoffice.CustomerListSlice",
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
