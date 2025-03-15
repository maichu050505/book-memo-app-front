import { useContext } from "react";
import { ReviewContext } from "../../providers/ReviewProvider.jsx";
import { AuthContext } from "../../providers/AuthProvider";
import { Meatball } from "../Meatball/Meatball.jsx";
import "../../../pages/app.scss";
import styles from "./ReviewBox.module.scss";

export const ReviewBox = ({ review: reviewProp, hideMeatball = false }) => {
  // ReviewContext から自分のレビュー情報を取得
  const reviewCtx = useContext(ReviewContext);
  const { user } = useContext(AuthContext);
  // reviewProp が渡されている場合はそれを優先する
  // ※「||」オペレーターは、左側が falsy なら右側を返すため、空文字や 0 も上書きされる可能性があるため使わない。
  // 「??」オペレーターは、左側が null または undefined の場合にだけ右側を返すので、空文字や 0 はそのまま有効な値として保持される。そのため、ここでは「??」を使う。
  const reviewText = reviewProp?.reviewText ?? reviewCtx.review;
  const rating = reviewProp?.rating ?? reviewCtx.rating;
  const date = reviewProp?.date ?? reviewCtx.date;
  // 投稿者情報（props.review がある場合はその user を、なければログインユーザーを使用）
  const reviewUser = reviewProp?.user || user;
  const userName = reviewUser ? reviewUser.username : "ゲスト";
  // ログイン中のユーザーがこのレビューの投稿者かどうかを判定
  const isOwnReview = reviewUser ? Number(reviewUser.id) === Number(user?.id) : true;

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

  // ユーザーのタイムゾーンに合わせて日付をフォーマットする関数
  const formatDateLocal = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const hours = d.getHours().toString().padStart(2, "0");
    const minutes = d.getMinutes().toString().padStart(2, "0");
    return `${year}年${month}月${day}日 ${hours}:${minutes}`;
  };

  // GET の結果がセットされる前はローディング状態にする
  if (!date && reviewText === "") {
    return <div>レビューを読み込み中…</div>;
  }

  return (
    <div className={`${styles.reviewBox} mb60`}>
      {/* myMemo タブの場合は Meatball を表示、others タブでは hideMeatball=true のため表示しない */}
      {!hideMeatball && isOwnReview && <Meatball type="editAndDeleteReview" />}
      <div className={styles.info}>
        <div className={styles.icon}>
          <img src="./img/icon_user.svg" alt="" />
        </div>
        <div className={styles.info_txt}>
          <p className={styles.userName}>{userName} さん</p>
          <p className={styles.date}>{formatDateLocal(date)}</p>
        </div>
      </div>
      <div className="starsCurrent mb10">{renderStars()}</div>
      <div className={styles.review_txt}>
        <p>{reviewText}</p>
      </div>
    </div>
  );
};
