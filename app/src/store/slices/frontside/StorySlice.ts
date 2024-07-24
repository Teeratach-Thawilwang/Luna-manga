import { createSlice } from "@reduxjs/toolkit";

import { StorySliceInterface } from "@interfaces/frontside/StoryInterface";

const initialState: StorySliceInterface = {
  data: null,
  is_loading: false,
  error: "",
};

const slice = createSlice({
  name: "Frontside.StorySlice",
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      return { ...state, ...action.payload };
    },
    updateData: (state, action) => {
      const payload = action.payload;
      const data = { ...state.data, ...payload };
      return { ...state, data: data };
    },
    updateReaction: (state, action) => {
      const { reaction } = action.payload;
      if (state.data) {
        state.data = { ...state.data, reaction: reaction };
      }
    },
  },
});

export const { update, updateData, updateReaction } = slice.actions;

export default slice.reducer;
