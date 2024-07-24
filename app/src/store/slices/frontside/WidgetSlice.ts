import { createSlice } from "@reduxjs/toolkit";

import { WidgetSliceInterface } from "@interfaces/frontside/WidgetInterface";

const initialState: WidgetSliceInterface = {
  data: [],
  paginate: null,
  is_loading: false,
  error: "",
};

const slice = createSlice({
  name: "Frontside.Widget",
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      return { ...state, ...action.payload };
    },
    pushWidgets: (state, action) => {
      const { data, ...rest } = action.payload;
      const newData = [...state.data, ...data];
      return { ...state, ...rest, data: newData };
    },
    updateWidgetStateById: (state, action) => {
      const data = state.data.map((widgetState) => {
        if (widgetState.data.id === action.payload.id) {
          const { id, ...rest } = action.payload;
          return { ...widgetState, ...rest };
        }
        return widgetState;
      });
      return { ...state, data: data };
    },
  },
});

export const { update, updateWidgetStateById, pushWidgets } = slice.actions;

export default slice.reducer;
