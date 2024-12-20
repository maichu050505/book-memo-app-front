import { Link } from "react-router-dom";
import styles from "./BookInfoBox.module.scss";
import { BookInfoButton } from "../BookInfoButton/BookInfoButton.jsx";

export const BookInfoBox = ({
  buttonLinkTo,
  buttonColor,
  buttonChildren,
  title,
  author,
  publisher,
  publishedDate,
  coverImageUrl,
  amazonLink,
}) => {
  return (
    <div className={styles.bookInfoBox}>
      <div className={styles.cover}>
        <img src={coverImageUrl} alt={title} />
      </div>
      <div className={styles.info}>
        <Link to="/single" className={styles.bookTitle}>
          {title}
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
        <p className={styles.subInfo}>
          {author} / {publisher} / {publishedDate}
        </p>
      </div>
      <div>
        <BookInfoButton linkTo={buttonLinkTo} buttonColor={buttonColor} children={buttonChildren} />
        <BookInfoButton linkTo={amazonLink} buttonColor="gray" children="Amazon" />
      </div>
    </div>
  );
};
