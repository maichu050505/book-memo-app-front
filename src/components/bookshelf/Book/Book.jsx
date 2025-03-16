import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import styles from "./Book.module.scss";

export const Book = React.memo(({ book }) => {
  const [hasReview, setHasReview] = useState(null); // レビューの状態管理
  const [hasMemo, setHasMemo] = useState(null); // ユーザーのメモがあるかを管理
  const [averageRating, setAverageRating] = useState(0); // 平均評価の管理

  useEffect(() => {
    if (!book) return;

    // メモがあるかチェック
    const fetchMemos = async () => {
      try {
        const res = await fetch(`http://localhost:3000/books/${book.id}/memos`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          console.error("メモ取得エラー: レスポンスが不正です", res.status);
          throw new Error("メモの取得に失敗しました");
        }

        const data = await res.json();
        setHasMemo(Array.isArray(data) && data.length > 0); // メモがあるかチェック
      } catch (error) {
        console.error("メモ取得エラー:", error);
      }
    };

    // レビューがあるかチェック
    const fetchReviews = async () => {
      try {
        const res = await fetch(`http://localhost:3000/books/${book.id}/reviews/count`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error("レビュー数の取得に失敗しました");

        const data = await res.json();
        setHasReview(data.count > 0); // レビュー数が1以上なら true
      } catch (error) {
        console.error("レビュー数取得エラー:", error);
      }
    };

    fetchMemos();
    fetchReviews();
  }, [book]); // `book` が変わったら再取得

  // 平均評価を取得
  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        const res = await fetch(`http://localhost:3000/books/${book.id}/reviews/average-rating`);
        if (!res.ok) throw new Error("平均評価の取得に失敗しました");

        const data = await res.json();
        setAverageRating(data.averageRating || 0);
      } catch (error) {
        console.error("平均評価の取得エラー:", error);
      }
    };

    if (book.id) {
      fetchAverageRating();
    }
  }, [book.id]);

  // 表示用関数
  const renderStars = useMemo(() => {
    const fullStars = Math.floor(averageRating); // 整数部分の星
    const hasHalfStar = averageRating % 1 >= 0.5; // 0.5 以上なら半分の星を表示
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // 残りの空の星

    return (
      <p className={styles.stars}>
        {/* 黄色の星 (整数部分) */}
        <span className={styles.yellow}>{"★".repeat(fullStars)}</span>

        {/* 半分の星 (小数点部分が 0.5 以上なら表示) */}
        {hasHalfStar && <img src="/img/star-half.svg" alt="半分の星" className={styles.starHalf} />}

        {/* 空の星 */}
        {"★".repeat(emptyStars)}
      </p>
    );
  }, [averageRating]);

  if (!book) {
    // book が渡されない場合は何もレンダリングしない
    return null;
  }

  return (
    <Link to={`/single?id=${book.id}`} className={styles.bookBox}>
      <div className={styles.coverArea}>
        <img src={book.coverImageUrl} alt="" />
      </div>
      <div className={styles.iconArea}>
        {/* 平均評価の星表示 */}
        {renderStars}
        {/* レビューがある場合のみ表示 */}
        {hasReview && (
          <div className={styles.review}>
            <img src="/img/icon_review-gray.svg" alt="レビューアイコン" />
          </div>
        )}
        {/* メモがある場合のみ表示 */}
        {hasMemo && (
          <div className={styles.memo}>
            <img src="/img/icon_memo.svg" alt="メモアイコン" />
          </div>
        )}
      </div>
    </Link>
  );
});
