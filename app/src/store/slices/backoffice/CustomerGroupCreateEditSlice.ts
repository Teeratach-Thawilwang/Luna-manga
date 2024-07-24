import { createSlice } from "@reduxjs/toolkit";

import { CustomerGroupCreateEditSliceInterface } from "@interfaces/backoffice/CustomerGroupInterface";

const initialState: CustomerGroupCreateEditSliceInterface = {
  name: null,
  status: null,
  name_error_message: "",
};

const slice = createSlice({
  name: "Backoffice.CustomerGroupCreateEditSlice",
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { update } = slice.actions;

export default slice.reducer;
