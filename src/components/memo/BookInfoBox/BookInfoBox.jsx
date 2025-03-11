import { memo, useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./BookInfoBox.module.scss";
import { BookInfoButton } from "../BookInfoButton/BookInfoButton.jsx";
import { useCheckBookshelf } from "../../../hooks/books/useCheckBookshelf.js";
import { AuthContext } from "../../providers/AuthProvider.jsx";

const BookInfoBoxComponent = ({ book, onAction }) => {
  const { title, author, publisher, publishedDate, coverImageUrl, amazonLink, id } = book;
  const { pathname, search } = useLocation(); // 現在のパスとクエリパラメータを取得
  const isSinglePage = pathname === "/single" && search.startsWith("?id=");

  // AuthContext からユーザー情報を取得
  const { user } = useContext(AuthContext);

  // user が存在する場合に、book.id と user.id を渡す
  const { isInBookshelf, setIsInBookshelf } = useCheckBookshelf(id, user ? user.id : null);

  // 本棚登録ユーザー数の状態を管理
  const [bookshelfCount, setBookshelfCount] = useState(0);

  // レビュー数の状態管理
  const [reviewCount, setReviewCount] = useState(0);

  // 本棚登録者数の取得
  useEffect(() => {
    const fetchBookshelfCount = async () => {
      try {
        const res = await fetch(`http://localhost:3000/books/${id}/bookshelf/count`);
        if (!res.ok) {
          throw new Error("本棚登録者数の取得に失敗しました");
        }
        const data = await res.json();
        setBookshelfCount(data.count);
      } catch (error) {
        console.error("本棚登録者数の取得エラー:", error);
      }
    };

    if (id) {
      fetchBookshelfCount();
    }
  }, [id]);

  // レビュー数の取得
  useEffect(() => {
    const fetchReviewCount = async () => {
      try {
        const res = await fetch(`http://localhost:3000/books/${id}/reviews/count`);
        if (!res.ok) {
          throw new Error("レビュー数の取得に失敗しました");
        }
        const data = await res.json();
        setReviewCount(data.count); // サーバーから取得したレビュー数をセット
      } catch (error) {
        console.error("レビュー数の取得エラー:", error);
      }
    };

    if (id) {
      fetchReviewCount();
    }
  }, [id]);

  // 日付を日本語形式に変換する
  const formattedDate = new Date(publishedDate).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleAction = async () => {
    try {
      const token = localStorage.getItem("token"); // トークンを取得
      //本棚に登録済みの場合は、
      if (isInBookshelf) {
        // 本棚から削除
        const res = await fetch(`http://localhost:3000/users/${user.id}/bookshelf/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error("本棚からの削除に失敗しました");
        }
        setIsInBookshelf(false);
        setBookshelfCount((prev) => Math.max(prev - 1, 0)); // 本棚登録者数を即時更新
        window.alert("本棚から削除しました");
        //本棚に登録されていない場合は、
      } else {
        // 本棚に登録
        const res = await fetch(`http://localhost:3000/users/${user.id}/bookshelf`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ bookId: id }),
        });
        if (!res.ok) {
          throw new Error("本棚への登録に失敗しました");
        }
        setIsInBookshelf(true);
        setBookshelfCount((prev) => prev + 1); // 本棚登録者数を即時更新
        window.alert("本棚に登録しました");
        if (onAction) onAction(true); // 状態変更時のコールバック
      }
    } catch (error) {
      console.error("エラー:", error);
    }
  };

  return (
    <div className={styles.bookInfoBox}>
      <div className={styles.cover}>
        <img src={coverImageUrl} alt={title} />
      </div>
      <div className={styles.info}>
        {/* 現在のパスが /single かつクエリパラメータが ?id=数字 の場合はタイトルのみ表示 */}
        {isSinglePage ? (
          <p className={styles.bookTitle_noLink}>{title}</p>
        ) : (
          <Link to={`/single?id=${id}`} className={styles.bookTitle}>
            {title}
          </Link>
        )}
        <div className={styles.numbers}>
          <p className={styles.registrants}>
            <img src="./img/icon_registrant.svg" alt="" />
            {bookshelfCount}
          </p>
          <p className={styles.stars}>★4.27</p>
          <p className={styles.reviewers}>
            <img src="./img/icon_review-blue.svg" alt="レビューを書いた人数" />
            {reviewCount}
          </p>
        </div>
        <p className={styles.subInfo}>
          {author} / {publisher} / {formattedDate}
        </p>
      </div>
      <div>
        <Link
          to={`/single?id=${id}`}
          className={`linkButton ${isInBookshelf ? "white_red" : "blue"}`}
          onClick={(e) => {
            e.preventDefault(); // リンクのデフォルトの挙動を防ぐ
            handleAction(); // e は渡さない
          }}
        >
          {isInBookshelf ? "本棚から削除" : "本棚に登録"}
        </Link>
        <BookInfoButton linkTo={amazonLink} buttonColor="gray" children="Amazon" />
      </div>
    </div>
  );
};

// React.memo を適用したものを別の変数に代入
export const BookInfoBox = memo(BookInfoBoxComponent);
