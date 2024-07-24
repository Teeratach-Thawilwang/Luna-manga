import { createSlice } from "@reduxjs/toolkit";

import { ChapterSliceInterface } from "@interfaces/backoffice/ChapterInterface";

const initialState: ChapterSliceInterface = {
  data: null,
  is_loading: false,
  error: "",
};

const slice = createSlice({
  name: "Backoffice.ChapterSlice",
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { update } = slice.actions;

export default slice.reducer;
