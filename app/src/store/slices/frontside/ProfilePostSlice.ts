import { createSlice } from "@reduxjs/toolkit";

import { ProfilePostSliceInterface } from "@interfaces/frontside/ProfilePostInterface";

const initialState: ProfilePostSliceInterface = {
  data: [],
  paginate: null,
  is_loading: false,
  error: "",
};

const slice = createSlice({
  name: "Frontside.ProfilePostSlice",
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      return { ...state, ...action.payload };
    },
    pushDataAtBegin: (state, action) => {
      const { data } = action.payload;
      const total = state.paginate!.total! + 1;
      const paginate = { ...state.paginate!, total: total };
      const newData = [...data, ...state.data];
      return { ...state, data: [...newData], paginate: paginate };
    },
    pushData: (state, action) => {
      const { data, ...rest } = action.payload;
      const newData = [...state.data, ...data];
      return { ...state, ...rest, data: newData };
    },
    deletePostById: (state, action) => {
      const { id: postId } = action.payload;
      const data = state.data.filter((post) => post.id !== postId);
      const total = state.paginate!.total! - 1;
      const paginate = { ...state.paginate!, total: total };
      return { ...state, data: [...data], paginate: paginate };
    },
    updateReaction: (state, action) => {
      const { postId, reaction } = action.payload;
      const data = state.data.map((post) => {
        if (post.id === postId) {
          return { ...post, reaction: reaction };
        }
        return post;
      });
      return { ...state, data: [...data] };
    },
  },
});

export const { update, pushData, pushDataAtBegin, deletePostById, updateReaction } = slice.actions;

export default slice.reducer;
