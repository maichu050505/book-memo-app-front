import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Book.module.scss";
import { AuthContext } from "../../providers/AuthProvider.jsx";

export const Book = ({ book }) => {
  const { user } = useContext(AuthContext); // ログインユーザーを取得
  const [hasMemo, setHasMemo] = useState(null); // ユーザーのメモがあるかを管理

  useEffect(() => {
    // ログイン時のみ、自分のメモを取得
    const fetchUserMemo = async () => {
      if (!user || !book) return;

      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `http://localhost:3000/users/${user.id}/bookshelf/${book.id}/memos`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("メモの取得に失敗しました");
        }

        const data = await res.json();
        setHasMemo(data.memos && data.memos.length > 0); // メモがあれば `true`
      } catch (error) {
        console.error("メモ取得エラー:", error);
        setHasMemo(false); // エラー時はメモなしと判断
      }
    };

    fetchUserMemo();
  }, [user, book]); // `user` or `book` が変わったら取得

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
        <p className={styles.stars}>
          <span className={styles.yellow}>★★★★</span>★
        </p>
        <div className={styles.review}>
          <img src="./img/icon_review-gray.svg" alt="" />
        </div>
        {/* 自分のメモがある場合のみ表示。`hasMemo === null` の間は何も表示しない（ローディング中） */}
        {hasMemo !== null && user && hasMemo && (
          <div className={styles.memo}>
            <img src="./img/icon_memo.svg" alt="" />
          </div>
        )}
      </div>
    </Link>
  );
};
