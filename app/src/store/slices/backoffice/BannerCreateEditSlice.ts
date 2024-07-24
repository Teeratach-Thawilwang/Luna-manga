import { createSlice } from "@reduxjs/toolkit";

import { BannerCreateEditSliceInterface } from "@interfaces/backoffice/BannerInterface";

const initialState: BannerCreateEditSliceInterface = {
  name: null,
  title: null,
  type: null,
  link: null,
  status: null,
  story: null,
  chapter: null,
  images: [],

  name_error_message: "",
  title_error_message: "",
  link_error_message: "",
  story_error_message: "",
  chapter_error_message: "",
  images_error_message: "",
};

const slice = createSlice({
  name: "Backoffice.BannerCreateEditSlice",
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { update } = slice.actions;

export default slice.reducer;
