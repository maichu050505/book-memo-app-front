import { useState } from "react";
import styles from "./EditReview.module.scss";

export const EditReview = () => {
  // 星評価の状態を管理（初期値は0）
  const [rating, setRating] = useState(0); // 選択された星評価を管理
  const [hoverRating, setHoverRating] = useState(0); //hoverRatingは、ユーザーがホバーしている星のインデックス（星の番号）を保持

  // 星を表示する関数
  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => {
      // ホバーしているときは色を切り替え、ホバーしていない時は通常の色にする
      const starClass = () => {
        // ホバー中の評価があればその値を優先、なければ選択された評価に基づく
        //ホバー中の星かどうかを判定。ホバーしている星の番号が、現在の星の番号以上かどうかをチェック。
        //たとえば、3番目の星をホバーしている場合は、hoverRating===3になる。ループでstar===1の時、3>1なのでtrue、star===2の時、3>2なのでtrue、star===3の時、3=3なのでtrue、trueの星だけreturnのstyles.yellowになる。
        if (hoverRating >= star) {
          return styles.yellow; //ホバーしている星の番号以下（左側）の星をすべて黄色にする
        }
        //ホバーしていないときは、評価した星の番号より左側をすべて黄色にする。!hoverRatingは「ホバーしていない」という意味。
        else if (!hoverRating && rating >= star) {
          return styles.yellow; // ホバーしていない時は評価済みの星を黄色に
        }
        //デフォルトはグレー
        return styles.gray; // ホバーしていなくて、評価もされていない星はグレーに
      };

      return (
        <span
          key={star}
          className={starClass()}
          onClick={() => setRating(star)} // クリック時に評価を設定
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
    setRating(0);
  };

  // ネタバレを含むかどうかを管理するstate
  const [netabare, setNetabare] = useState("notInclude");

  // ネタバレが選択されたときにstateを更新
  const handleNetabareChange = (e) => {
    setNetabare(e.target.value);
  };

  return (
    <>
      <div>
        <div className={styles.stars}>
          <p>評価</p>
          {renderStars()}
          <button className={styles.resetButton} onClick={resetStars}>
            <img src="./img/icon_delete.svg" width="20px" height="20px" alt="" />
            評価なし
          </button>
        </div>
        <textarea></textarea>
      </div>
      <div className={styles.netabare}>
        <div className={styles.include}>
          <input
            type="radio"
            id="include"
            name="netabare"
            value="include"
            checked={netabare === "include"}
            onChange={handleNetabareChange}
          />
          <label htmlFor="include" className={netabare === "include" ? styles.checked : ""}>
            ネタバレを含む
          </label>
        </div>
        <div className={styles.notInclude}>
          <input
            type="radio"
            id="notInclude"
            name="netabare"
            value="notInclude"
            checked={netabare === "notInclude"}
            onChange={handleNetabareChange}
          />
          <label htmlFor="notInclude" className={netabare === "notInclude" ? styles.checked : ""}>
            ネタバレを含まない
          </label>
        </div>
      </div>
    </>
  );
};
