import { configureStore } from "@reduxjs/toolkit";
import reviewReducer from "./modules/reviewSlice.jsx"; // reviewSliceをインポート
import memoReducer from "./modules/memoSlice.jsx"; // reviewSliceをインポート

// Reduxストアの設定
export default configureStore({
  reducer: {
    review: reviewReducer, // reviewSliceのreducerを指定
    memo: memoReducer, // memoSliceのreducerを指定
  },
});
