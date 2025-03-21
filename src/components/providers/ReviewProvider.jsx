import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { getUrl } from "../../utils/urls";

export const ReviewContext = createContext({});

export const ReviewProvider = ({ children, bookId }) => {
  const { user } = useContext(AuthContext); // ユーザー情報を取得
  //編集モード切り替え
  const [isEditingReview, setIsEditingReview] = useState(true);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [date, setDate] = useState(null);
  const [reviews, setReviews] = useState([]); // みんなのレビューを管理
  const [reviewUpdated, setReviewUpdated] = useState(false); // レビュー更新トリガー

  // `reviewUpdated` を切り替える関数
  const toggleReviewUpdated = () => {
    setReviewUpdated((prev) => !prev);
  };

  // 自分のレビューを取得して初期化
  useEffect(() => {
    const fetchReview = async () => {
      try {
        const token = localStorage.getItem("token");
        // ユーザーが定義されていなければ何もしない
        if (!user) {
          console.error("ユーザー情報がありません");
          return;
        }
        const res = await fetch(getUrl(`/users/${user.id}/bookshelf/${bookId}/reviews`), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
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

  // みんなのレビューを取得
  useEffect(() => {
    if (!bookId) return;

    const fetchOtherReviews = async () => {
      try {
        const res = await fetch(getUrl(`/books/${bookId}/reviews`), {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) {
          throw new Error("全てのレビューの取得に失敗しました");
        }
        const data = await res.json();
        setReviews(data.reviews || []);
      } catch (err) {
        console.error("全てのレビュー取得エラー:", err);
      }
    };

    fetchOtherReviews();
  }, [bookId, reviewUpdated]);

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
        reviews,
        setReviews,
        reviewUpdated,
        setReviewUpdated,
        toggleReviewUpdated,
        bookId,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};
