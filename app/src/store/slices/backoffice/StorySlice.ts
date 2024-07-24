import { createSlice } from "@reduxjs/toolkit";

import { StorySliceInterface } from "@interfaces/backoffice/StoryInterface";

const initialState: StorySliceInterface = {
  data: null,
  is_loading: false,
  error: "",
};

const slice = createSlice({
  name: "Backoffice.StorySlice",
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { update } = slice.actions;

export default slice.reducer;
