import { createSlice } from "@reduxjs/toolkit";

import { StorySearchSliceInterface } from "@interfaces/frontside/StorySearchInterface";

const initialState: StorySearchSliceInterface = {
  q: "",
  data: [],
  is_modal_show: false,
  is_loading: false,
  error: "",
};

const slice = createSlice({
  name: "Frontside.StorySearchSlice",
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { update } = slice.actions;

export default slice.reducer;
