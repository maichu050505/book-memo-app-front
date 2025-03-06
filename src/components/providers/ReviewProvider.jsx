import { createContext, useState, useEffect, useRef, useContext } from "react";
import { AuthContext } from "./AuthProvider";

export const ReviewContext = createContext({});

export const ReviewProvider = ({ children, bookId }) => {
  const { user } = useContext(AuthContext); // ユーザー情報を取得
  //編集モード切り替え
  const [isEditingReview, setIsEditingReview] = useState(true);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [date, setDate] = useState(null);
  const isInitialRender = useRef(true); // 初回レンダリングを判定するフラグ

  // サーバーからレビューを取得して初期化
  useEffect(() => {
    const fetchReview = async () => {
      try {
        const token = localStorage.getItem("token");
        // ユーザーが定義されていなければ何もしない
        if (!user) {
          console.error("ユーザー情報がありません");
          return;
        }
        const res = await fetch(
          `http://localhost:3000/users/${user.id}/bookshelf/${bookId}/reviews`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
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

    if (bookId && user) {
      fetchReview();
    }
  }, [bookId, user]);

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
