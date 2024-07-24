import { createSlice } from "@reduxjs/toolkit";

import { StoryListSliceInterface } from "@interfaces/backoffice/StoryInterface";

const initialState: StoryListSliceInterface = {
  data: [],
  paginate: null,
  filter: null,
  is_loading: false,
  error: "",
};

const slice = createSlice({
  name: "Backoffice.StoryListSlice",
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
