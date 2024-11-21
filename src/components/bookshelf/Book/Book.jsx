import { Link } from "react-router-dom";
import styles from "./Book.module.scss";

export const Book = () => {
  return (
    <Link to="/single" className={styles.bookBox}>
      <div className={styles.coverArea}>
        <img src="/img/cover1.jpg" alt="" />
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
