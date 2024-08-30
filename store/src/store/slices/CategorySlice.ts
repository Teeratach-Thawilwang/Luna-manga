import { createSlice } from "@reduxjs/toolkit";

import { CategorySliceInterface } from "@interfaces/CategoryInterface";

const initialState: CategorySliceInterface = {
  data: [],
  type: null,
  paginate: null,
  is_loading: false,
  error: "",
};

const slice = createSlice({
  name: "Frontside.CategorySlice",
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      return { ...state, ...action.payload };
    },
    pushCategories: (state, action) => {
      state.data.push(action.payload);
    },
  },
});

export const { update, pushCategories } = slice.actions;

export default slice.reducer;
