import { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./BookInfoBox.module.scss";
import { BookInfoButton } from "../BookInfoButton/BookInfoButton.jsx";
import { useCheckBookshelf } from "../../../hooks/books/useCheckBookshelf.js";

const BookInfoBoxComponent = ({ book, onAction }) => {
  const { title, author, publisher, publishedDate, coverImageUrl, amazonLink, id } = book;

  const { pathname, search } = useLocation(); // 現在のパスとクエリパラメータを取得
  const isSinglePage = pathname === "/single" && search.startsWith("?id=");

  // コンポーネント初期化時に本棚の状態を確認
  const { isInBookshelf, setIsInBookshelf } = useCheckBookshelf(id);

  const handleAction = async () => {
    try {
      //本棚に登録済みの場合は、
      if (isInBookshelf) {
        // 本棚から削除
        const res = await fetch("http://localhost:3000/books/bookshelf", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
        if (!res.ok) {
          throw new Error("本棚からの削除に失敗しました");
        }
        setIsInBookshelf(false);
        //本棚に登録されていない場合は、
      } else {
        // 本棚に登録
        const res = await fetch("http://localhost:3000/books/bookshelf", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
        if (!res.ok) {
          throw new Error("本棚への登録に失敗しました");
        }
        setIsInBookshelf(true);
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
            88
          </p>
          <p className={styles.stars}>★4.27</p>
          <p className={styles.reviewers}>
            <img src="./img/icon_review-blue.svg" alt="レビューを書いた人数" />1
          </p>
        </div>
        <p className={styles.subInfo}>
          {author} / {publisher} / {publishedDate}
        </p>
      </div>
      <div>
        <Link
          to={`/single?id=${id}`}
          className={`linkButton ${isInBookshelf ? "white_red" : "blue"}`}
          onClick={handleAction}
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