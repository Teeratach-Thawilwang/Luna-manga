import { createSlice } from "@reduxjs/toolkit";

import { ChapterCommentSliceInterface } from "@interfaces/ChapterCommentInterface";

const initialState: ChapterCommentSliceInterface = {
  data: [],
  paginate: null,
  is_loading: false,
  error: "",
};

const slice = createSlice({
  name: "Frontside.ChapterCommentSlice",
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
    deleteCommentById: (state, action) => {
      const { id: commentId } = action.payload;
      const data = state.data.filter((comment) => comment.id != commentId);
      const total = state.paginate!.total! - 1;
      const paginate = { ...state.paginate!, total: total };
      return { ...state, data: [...data], paginate: paginate };
    },
    updateReaction: (state, action) => {
      const { commentId, reaction } = action.payload;
      const data = state.data.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, reaction: reaction };
        }
        return comment;
      });
      return { ...state, data: [...data] };
    },
  },
});

export const { update, pushData, pushDataAtBegin, deleteCommentById, updateReaction } = slice.actions;

export default slice.reducer;
