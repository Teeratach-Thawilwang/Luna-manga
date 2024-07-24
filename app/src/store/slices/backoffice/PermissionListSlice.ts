import { createSlice } from "@reduxjs/toolkit";

import { PermissionListSliceInterface } from "@interfaces/backoffice/PermissionInterface";

const initialState: PermissionListSliceInterface = {
  data: [],
  is_loading: false,
  error: "",
};

const slice = createSlice({
  name: "Backoffice.PermissionListSlice",
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { update } = slice.actions;

export default slice.reducer;
