import { createSlice } from "@reduxjs/toolkit";

import { WidgetSliceInterface } from "@interfaces/backoffice/WidgetInterface";

const initialState: WidgetSliceInterface = {
  data: null,
  is_loading: false,
  error: "",
};

const slice = createSlice({
  name: "Backoffice.WidgetSlice",
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { update } = slice.actions;

export default slice.reducer;
