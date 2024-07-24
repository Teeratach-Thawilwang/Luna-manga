import { createSlice } from "@reduxjs/toolkit";

import { BookmarkSliceInterface } from "@interfaces/frontside/BookmarkInterface";

const initialState: BookmarkSliceInterface = {
  data: [],
  paginate: null,
  is_loading: false,
  error: "",
};

const slice = createSlice({
  name: "Frontside.BookmarkSlice",
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      return { ...state, ...action.payload };
    },
    pushStory: (state, action) => {
      state.data.push(action.payload);
    },
    deleteById: (state, action) => {
      if (state.paginate == null) {
        return { ...state };
      }
      const { id: storyId } = action.payload;
      const data = state.data.filter((story) => story.id !== storyId);
      const total = state.paginate!.total! - 1;
      const paginate = { ...state.paginate!, total: total };
      return { ...state, data: [...data], paginate: paginate };
    },
  },
});

export const { update, pushStory, deleteById } = slice.actions;

export default slice.reducer;
