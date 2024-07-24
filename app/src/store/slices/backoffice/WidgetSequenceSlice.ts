import { createSlice } from "@reduxjs/toolkit";

import { WidgetSequenceSliceInterface } from "@interfaces/backoffice/WidgetInterface";

const initialState: WidgetSequenceSliceInterface = {
  data: [],
  is_loading: false,
  error: "",
};

const slice = createSlice({
  name: "Backoffice.WidgetSequenceSlice",
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      return { ...state, ...action.payload };
    },
    deleteById: (state, action) => {
      const { id: widgetId } = action.payload;
      const data = state.data.filter((widget) => widget.id !== widgetId);
      return { ...state, data: [...data] };
    },
  },
});

export const { update, deleteById } = slice.actions;

export default slice.reducer;
