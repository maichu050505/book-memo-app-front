import { createSlice } from "@reduxjs/toolkit";

// 初期状態
const initialState = {
  memoText: "",
  memoImage: null,
  memos: [],
  isEditingMemo: false,
};

// レビュー管理のslice
const memoSlice = createSlice({
  name: "memo",
  initialState,
  reducers: {
    // memoTextとmemoImageを更新するアクション
    setMemo: (state, action) => {
      state.memoText = action.payload.memoText; // メモのテキストを管理
      state.memoImage = action.payload.memoImage; // メモの画像を管理
    },
    // 新しいメモをmemos配列に追加するアクション
    addMemo: (state, action) => {
      state.memos.push(action.payload); // memos配列に新しいメモを追加
    },
    setEditingMemo: (state, action) => {
      state.isEditingMemo = action.payload;
    },
    // memoTextとmemoImageのリセット用アクション
    resetMemo: (state) => {
      state.memoText = "";
      state.memoImage = null;
    },
  },
});

// actionsとreducerのエクスポート
export const { setMemo, addMemo, setEditingMemo, resetMemo } = memoSlice.actions;
export default memoSlice.reducer;
