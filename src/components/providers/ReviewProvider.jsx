import { createContext, useState, useEffect, useRef } from "react";

export const ReviewContext = createContext({});

export const ReviewProvider = ({children, bookId}) => {
  //編集モード切り替え
  const [isEditingReview, setIsEditingReview] = useState(true);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [date, setDate] = useState(null);
  const isInitialRender = useRef(true); // 初回レンダリングを判定するフラグ

  // サーバーからレビューを取得して初期化
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false; // 初回レンダリングをスキップ
      return;
    }

    const fetchReview = async () => {
      try {
        const res = await fetch(`http://localhost:3000/books/reviews/${bookId}`);
        if (!res.ok) {
          throw new Error("レビューの取得に失敗しました");
        }

        const data = await res.json();
        console.log(`取得したレビュー (bookId=${bookId}):`, data);

        setReview(data.reviewText);
        setRating(data.rating || 0); // ratingが無い場合は0
        setDate(data.date || null); // dateが無い場合はnull
      } catch (error) {
        console.error("レビュー取得エラー:", error);
      }
    };

    if (bookId) {
      fetchReview();
    }
  }, [bookId]);

  return (
    <ReviewContext.Provider
      value={{
        isEditingReview,
        setIsEditingReview,
        review,
        setReview,
        rating,
        setRating,
        date,
        setDate,
        bookId,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};