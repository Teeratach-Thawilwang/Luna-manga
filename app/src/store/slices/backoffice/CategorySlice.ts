import { createSlice } from "@reduxjs/toolkit";

import { CategorySliceInterface } from "@interfaces/backoffice/CategoryInterface";

const initialState: CategorySliceInterface = {
  data: null,
  is_loading: false,
  error: "",
};

const slice = createSlice({
  name: "Backoffice.CategorySlice",
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { update } = slice.actions;

export default slice.reducer;
