import { createSlice } from "@reduxjs/toolkit";

import { CategoryListSliceInterface } from "@interfaces/backoffice/CategoryInterface";

const initialState: CategoryListSliceInterface = {
  data: [],
  paginate: null,
  filter: null,
  is_loading: false,
  error: "",
};

const slice = createSlice({
  name: "Backoffice.CategoryListSlice",
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      return { ...state, ...action.payload };
    },

    updateFilter: (state, action) => {
      return { ...state, filter: { ...state.filter, ...action.payload } };
    },

    deleteById: (state, action) => {
      const { id: categoryId } = action.payload;
      const data = state.data.filter((category) => category.id !== categoryId);
      const total = state.paginate!.total! - 1;
      const paginate = { ...state.paginate!, total: total };
      return { ...state, data: [...data], paginate: paginate };
    },
  },
});

export const { update, updateFilter, deleteById } = slice.actions;

export default slice.reducer;
