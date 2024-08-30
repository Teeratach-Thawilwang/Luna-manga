import { createSlice } from "@reduxjs/toolkit";

import { ChapterSliceInterface } from "@interfaces/ChapterInterface";

const initialState: ChapterSliceInterface = {
  data: null,
  is_loading: false,
  is_accept_audio: false,
  audio_current: 0,
  error: "",
};

const slice = createSlice({
  name: "Frontside.ChapterSlice",
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      return { ...state, ...action.payload };
    },
    updateReaction: (state, action) => {
      const { reaction } = action.payload;
      if (state.data) {
        state.data.reaction = reaction;
      }
    },
  },
});

export const { update, updateReaction } = slice.actions;

export default slice.reducer;
