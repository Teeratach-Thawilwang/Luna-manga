import { createSlice } from "@reduxjs/toolkit";

import { UserListSliceInterface } from "@interfaces/backoffice/UserInterface";

const initialState: UserListSliceInterface = {
  data: [],
  paginate: null,
  filter: null,
  is_loading: false,
  error: "",
};

const slice = createSlice({
  name: "Backoffice.UserListSlice",
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      return { ...state, ...action.payload };
    },

    updateFilter: (state, action) => {
      return { ...state, filter: { ...state.filter, ...action.payload } };
    },

    deleteById: (state, action) => {
      const { id: userId } = action.payload;
      const data = state.data.filter((user) => user.id !== userId);
      const total = state.paginate!.total! - 1;
      const paginate = { ...state.paginate!, total: total };
      return { ...state, data: [...data], paginate: paginate };
    },
  },
});

export const { update, updateFilter, deleteById } = slice.actions;

export default slice.reducer;
