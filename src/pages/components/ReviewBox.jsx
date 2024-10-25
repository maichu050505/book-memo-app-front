import styles from "./ReviewBox.module.scss";

export const ReviewBox = () => {
  return (
    <div className={styles.reviewBox}>
      <div className={styles.info}>
        <div className={styles.icon}>
          <img src="./img/icon_user.svg" alt="" />
        </div>
        <div className={styles.info_txt}>
          <p className={styles.userName}>MaiW さん</p>
          <p className={styles.date}>20xx年xx月xx日</p>
        </div>
      </div>
      <div className={styles.stars}>★★★★★</div>
      <div className={styles.review_txt}>
        <p>JavaScriptの必要な情報も載っていてわかりやすかった。役に立った。</p>
        <p> Reduxについての記載はなかった。</p>
      </div>
    </div>
  );
};
