import { createSlice } from "@reduxjs/toolkit";

import { ThemeSliceInterface } from "@interfaces/ThemeInterface";

const initialState: ThemeSliceInterface = {
  theme: null,
};

const slice = createSlice({
  name: "Backoffice.ThemeSlice",
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { update } = slice.actions;

export default slice.reducer;
