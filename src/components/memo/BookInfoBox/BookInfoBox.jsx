import { Link } from "react-router-dom";
import styles from "./BookInfoBox.module.scss";
import { BookInfoButton } from "../BookInfoButton/BookInfoButton.jsx";

export const BookInfoBox = ({ buttonLinkTo, buttonColor, buttonChildren }) => {
  return (
    <div className={styles.bookInfoBox}>
      <div className={styles.cover}>
        <img src="./img/cover1.jpg" alt="登録者数" />
      </div>
      <div className={styles.info}>
        <Link to="/single" className={styles.bookTitle}>
          これからはじめるReact実践入門 コンポーネントの基本からNext.jsによるアプリ開発まで
        </Link>
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
        <p className={styles.subInfo}>じゃけぇ（岡田拓巳） / SBクリエイティブ / 2021年9月16日</p>
      </div>
      <div>
        <BookInfoButton linkTo={buttonLinkTo} buttonColor={buttonColor} children={buttonChildren} />
        <BookInfoButton linkTo="#" buttonColor="gray" children="Amazon" />
      </div>
    </div>
  );
};
