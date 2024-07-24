import { createSlice } from "@reduxjs/toolkit";

import { BannerListSliceInterface } from "@interfaces/backoffice/BannerInterface";

const initialState: BannerListSliceInterface = {
  data: [],
  paginate: null,
  filter: null,
  is_loading: false,
  error: "",
};

const slice = createSlice({
  name: "Backoffice.BannerListSlice",
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      return { ...state, ...action.payload };
    },

    updateFilter: (state, action) => {
      return { ...state, filter: { ...state.filter, ...action.payload } };
    },

    deleteById: (state, action) => {
      const { id: bannerId } = action.payload;
      const data = state.data.filter((banner) => banner.id !== bannerId);
      const total = state.paginate!.total! - 1;
      const paginate = { ...state.paginate!, total: total };
      return { ...state, data: [...data], paginate: paginate };
    },
  },
});

export const { update, updateFilter, deleteById } = slice.actions;

export default slice.reducer;
