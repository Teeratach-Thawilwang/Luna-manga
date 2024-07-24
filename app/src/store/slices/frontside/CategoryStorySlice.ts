import { createSlice } from "@reduxjs/toolkit";

import { CategoryStorySliceInterface } from "@interfaces/frontside/CategoryStoryInterface";

const initialState: CategoryStorySliceInterface = {
  data: [],
  category_selected_id: null,
  paginate: null,
  is_loading: false,
  error: "",
};

const slice = createSlice({
  name: "Frontside.CategoryStorySlice",
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      return { ...state, ...action.payload };
    },
    pushStories: (state, action) => {
      state.data.push(action.payload);
    },
  },
});

export const { update, pushStories } = slice.actions;

export default slice.reducer;
