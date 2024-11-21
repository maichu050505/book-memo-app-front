import { createSlice } from "@reduxjs/toolkit";

// 初期状態
const initialState = {
  review: "",
  rating: 0,
  date: null,
  isEditingReview: true,
};

// レビュー管理のslice
const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    setReview: (state, action) => {
      state.review = action.payload.review;
      state.rating = action.payload.rating;
      state.date = action.payload.date;
    },
    setEditingReview: (state, action) => {
      state.isEditingReview = action.payload;
    },
  },
});

// actionsとreducerのエクスポート
export const { setReview, setEditingReview } = reviewSlice.actions;
export default reviewSlice.reducer;
