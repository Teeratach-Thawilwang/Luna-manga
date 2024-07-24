import { createSlice } from "@reduxjs/toolkit";

import { ChapterListSliceInterface } from "@interfaces/backoffice/ChapterInterface";

const initialState: ChapterListSliceInterface = {
  data: [],
  paginate: null,
  filter: null,
  is_loading: false,
  error: "",
};

const slice = createSlice({
  name: "Backoffice.ChapterListSlice",
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      return { ...state, ...action.payload };
    },

    updateFilter: (state, action) => {
      return { ...state, filter: { ...state.filter, ...action.payload } };
    },
  },
});

export const { update, updateFilter } = slice.actions;

export default slice.reducer;
