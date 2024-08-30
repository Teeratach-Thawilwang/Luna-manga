import { createSlice } from "@reduxjs/toolkit";

import { WidgetOnPageSliceInterface } from "@interfaces/WidgetOnPageInterface";

const initialState: WidgetOnPageSliceInterface = {
  data: [],
  is_loading: false,
  error: "",
};

const slice = createSlice({
  name: "Frontside.WidgetOnPage",
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { update } = slice.actions;

export default slice.reducer;
