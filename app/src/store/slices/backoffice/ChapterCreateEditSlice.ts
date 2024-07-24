import { createSlice } from "@reduxjs/toolkit";

import { ChapterCreateEditSliceInterface } from "@interfaces/backoffice/ChapterInterface";

const initialState: ChapterCreateEditSliceInterface = {
  story: null,
  name: null,
  chapter_number: null,
  type: null,
  status: null,
  text_editor: [],
  manga_editor: [],
  cover_image: null,
  story_error_message: "",
  name_error_message: "",
  chapter_number_error_message: "",
  cover_image_error_message: "",
  text_editor_error_message: "",
  manga_editor_error_message: "",
};

const slice = createSlice({
  name: "Backoffice.ChapterCreateEditSlice",
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { update } = slice.actions;

export default slice.reducer;
