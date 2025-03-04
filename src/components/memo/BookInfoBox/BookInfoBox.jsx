import { memo, useContext } from "react";
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
