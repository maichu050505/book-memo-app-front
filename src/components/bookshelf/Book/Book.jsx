import { Link } from "react-router-dom";
import styles from "./Book.module.scss";

export const Book = ({ book }) => {
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
        <div className={styles.memo}>
          <img src="./img/icon_memo.svg" alt="" />
        </div>
      </div>
    </Link>
  );
};
