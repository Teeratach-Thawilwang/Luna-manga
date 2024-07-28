import { createSlice } from "@reduxjs/toolkit";

import { StoryCreateEditSliceInterface } from "@interfaces/backoffice/StoryInterface";

const initialState: StoryCreateEditSliceInterface = {
  name: null,
  slug: null,
  type: null,
  description: null,
  status: null,
  categories: [],
  cover_image: null,

  name_error_message: "",
  description_error_message: "",
  categories_error_message: "",
  cover_image_error_message: "",
};

const slice = createSlice({
  name: "Backoffice.StoryCreateEditSlice",
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { update } = slice.actions;

export default slice.reducer;
