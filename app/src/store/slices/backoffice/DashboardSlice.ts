import { createSlice } from "@reduxjs/toolkit";

import { DashboardSliceInterface } from "@interfaces/backoffice/DashboardInterface";

const initialState: DashboardSliceInterface = {
  data: [],
  is_loading: false,
  error: "",
};

const slice = createSlice({
  name: "Backoffice.DashboardSlice",
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { update } = slice.actions;

export default slice.reducer;
