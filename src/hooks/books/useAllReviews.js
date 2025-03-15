// 他のユーザーも含めた全てのレビューを取得
import { useState, useEffect, useContext } from "react";
import { ReviewContext } from "../../components/providers/ReviewProvider";

export const useAllReviews = (bookId) => {
  const { reviews, setReviews, reviewUpdated } = useContext(ReviewContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!bookId) return;

    const fetchOtherReviews = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`http://localhost:3000/books/${bookId}/reviews`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          throw new Error("他ユーザーのレビューの取得に失敗しました");
        }
        const data = await res.json();
        setReviews(data.reviews || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOtherReviews();
  }, [bookId, setReviews, reviewUpdated]);

  return { reviews, loading, error };
};
