import { createSlice } from "@reduxjs/toolkit";

import { CategoryCreateEditSliceInterface } from "@interfaces/backoffice/CategoryInterface";

const initialState: CategoryCreateEditSliceInterface = {
  name: null,
  type: null,
  status: null,
  image: null,

  name_error_message: "",
  type_error_message: "",
  image_error_message: "",
};

const slice = createSlice({
  name: "Backoffice.CategoryCreateEditSlice",
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { update } = slice.actions;

export default slice.reducer;
