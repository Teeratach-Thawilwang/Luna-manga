import { createSlice } from "@reduxjs/toolkit";

import { WidgetCreateEditSliceInterface } from "@interfaces/backoffice/WidgetInterface";

const initialState: WidgetCreateEditSliceInterface = {
  name: null,
  title: null,
  type: null,
  status: null,
  banners: [],

  name_error_message: "",
  title_error_message: "",
  banner_error_message: "",
};

const slice = createSlice({
  name: "Backoffice.WidgetCreateEditSlice",
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { update } = slice.actions;

export default slice.reducer;
