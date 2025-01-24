import { useContext } from "react";
import { ReviewContext } from "../../providers/ReviewProvider.jsx";
import { Meatball } from "../Meatball/Meatball.jsx";
import "../../../pages/app.scss";
import styles from "./ReviewBox.module.scss";

export const ReviewBox = () => {
  const { review, rating, date } = useContext(ReviewContext);

  // 星を表示する関数（EditReviewと同じロジック）
  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => {
      // 評価の値に基づいて星の色を変更
      const starClass = rating >= star ? "yellow" : "gray";

      return (
        <span key={star} className={starClass}>
          ★
        </span>
      );
    });
  };

  return (
    <div className={`${styles.reviewBox} mb60`}>
      <Meatball type="editAndDeleteReview" />
      <div className={styles.info}>
        <div className={styles.icon}>
          <img src="./img/icon_user.svg" alt="" />
        </div>
        <div className={styles.info_txt}>
          <p className={styles.userName}>MaiW さん</p>
          <p className={styles.date}>{date}</p>
        </div>
      </div>
      <div className="starsCurrent mb10">{renderStars()}</div>
      <div className={styles.review_txt}>
        <p>{review}</p>
      </div>
    </div>
  );
};
