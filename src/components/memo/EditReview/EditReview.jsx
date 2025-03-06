import { useState, useContext } from "react";
import { ReviewContext } from "../../providers/ReviewProvider.jsx";
import { AuthContext } from "../../providers/AuthProvider.jsx";
import "../../../pages/app.scss";
import styles from "./EditReview.module.scss";
import { SubmitButton } from "../../../components/common/SubmitButton.jsx";

export const EditReview = () => {
  const { setIsEditingReview, review, setReview, rating, setRating, setDate, bookId } =
    useContext(ReviewContext);
  const { user } = useContext(AuthContext);
  const [localRating, setLocalRating] = useState(rating || 0); // 選択された星評価を管理
  const [hoverRating, setHoverRating] = useState(0); //hoverRatingは、ユーザーがホバーしている星のインデックス（星の番号）を保持
  const [localReview, setLocalReview] = useState(review || ""); // レビューのテキスト状態を管理

  // 星を表示する関数
  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => {
      // ホバーしているときは色を切り替え、ホバーしていない時は通常の色にする
      const starClass = () => {
        // ホバー中の評価があればその値を優先、なければ選択された評価に基づく
        //ホバー中の星かどうかを判定。ホバーしている星の番号が、現在の星の番号以上かどうかをチェック。
        //たとえば、3番目の星をホバーしている場合は、hoverRating===3になる。ループでstar===1の時、3>1なのでtrue、star===2の時、3>2なのでtrue、star===3の時、3=3なのでtrue、trueの星だけreturnのstyles.yellowになる。
        if (hoverRating >= star) {
          return "yellow"; //ホバーしている星の番号以下（左側）の星をすべて黄色にする
        }
        //ホバーしていないときは、評価した星の番号より左側をすべて黄色にする。!hoverRatingは「ホバーしていない」という意味。
        else if (!hoverRating && localRating >= star) {
          return "yellow"; // ホバーしていない時は評価済みの星を黄色に
        }
        //デフォルトはグレー
        return "gray"; // ホバーしていなくて、評価もされていない星はグレーに
      };

      return (
        <span
          key={star}
          className={starClass()}
          onClick={() => setLocalRating(star)} // クリック時に評価を設定
          onMouseEnter={() => setHoverRating(star)} // ホバー時に星評価を設定
          onMouseLeave={() => setHoverRating(0)} // ホバー終了時にリセット
        >
          ★
        </span>
      );
    });
  };

  //評価なしボタンをクリックしたら評価をリセット
  const resetStars = () => {
    setLocalRating(0);
    setRating(0);
  };

  // 現在の日付を取得する関数
  const getCurrentDate = () => {
    const date = new Date();
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  };

  const saveReview = async () => {
    try {
      const reviewData = {
        reviewText: localReview, // ユーザーが入力した内容
        rating: localRating, // ユーザーが選択した評価
        date: new Date().toISOString(), // 現在時刻（ISO形式）
      };

      console.log("保存前のデータ:", { bookId, ...reviewData });

      if (!user) {
        throw new Error("ユーザー情報がありません");
      }
      const token = localStorage.getItem("token");

      const url = `http://localhost:3000//users/${user.id}/bookshelf/${bookId}/reviews`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reviewData),
      });

      if (!res.ok) {
        throw new Error("レビューの保存に失敗しました");
      }

      const result = await res.json();
      console.log("サーバーからの応答:", result);

      if (result && result.review) {
        setReview(result.review.reviewText);
        setRating(result.review.rating || 0);
        setDate(result.review.date || new Date().toLocaleDateString());
        setIsEditingReview(false);
      } else {
        throw new Error("保存したレビューが不正です");
      }
    } catch (error) {
      console.error("レビュー保存エラー:", error);
      alert("レビューの保存に失敗しました。もう一度お試しください。");
    }
  };

  return (
    <div className="mb60">
      <div>
        <div className="stars">
          <p>評価</p>
          {renderStars()}
          <button className={styles.resetButton} onClick={resetStars}>
            <img src="./img/icon_delete-red.svg" width="14px" height="14px" alt="" />
            評価なし
          </button>
        </div>
        <textarea
          className={styles.textareaReview}
          rows="7"
          placeholder="感想やレビューを入力してください。"
          value={localReview}
          onChange={(e) => setLocalReview(e.target.value)}
        ></textarea>
      </div>
      <SubmitButton
        key="submitButtonReview"
        children="保存する"
        className="mt10"
        onClick={saveReview}
      />
    </div>
  );
};
