import { createSlice } from "@reduxjs/toolkit";

import { StoryChapterSliceInterface } from "@interfaces/StoryChapterInterface";

const initialState: StoryChapterSliceInterface = {
  data: [],
  paginate: null,
  is_loading: false,
  error: "",
};

const slice = createSlice({
  name: "Frontside.StoryChapterSlice",
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      return { ...state, ...action.payload };
    },
    pushData: (state, action) => {
      const { data, ...rest } = action.payload;
      const newData = [...state.data, ...data];
      return { ...state, ...rest, data: newData };
    },
  },
});

export const { update, pushData } = slice.actions;

export default slice.reducer;
