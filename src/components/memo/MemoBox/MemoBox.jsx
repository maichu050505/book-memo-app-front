import { useContext } from "react";
import { Meatball } from "../Meatball/Meatball";
import styles from "./MemoBox.module.scss";
import { AddMemoBox } from "../AddMemoBox/AddMemoBox.jsx";
import { MemoContext } from "../../providers/MemoProvider.jsx";
import { getUrl } from "../../../utils/urls.jsx";

export const MemoBox = ({ memo }) => {
  console.log("MemoBoxでのmemo:", memo);
  console.log("MemoBoxの画像 (JSON):", JSON.stringify(memo.memoImg));

  // `memo.memoImg` を適切な配列に変換
  let imagesArray = [];

  if (!memo.memoImg || memo.memoImg === "null" || memo.memoImg === "undefined") {
    imagesArray = []; // `null` や `"null"` の場合、空の配列をセット
  } else if (typeof memo.memoImg === "string") {
    imagesArray = memo.memoImg.split("||").filter(Boolean); // 文字列なら `||` で分割
  } else if (Array.isArray(memo.memoImg)) {
    imagesArray = memo.memoImg; // すでに配列ならそのまま使用
  }

  console.log("修正後の画像配列:", imagesArray);

  const editingOff = (
    <div className={styles.memoBox}>
      <Meatball type="editAndDeleteMemo" memoId={memo.id} />
      <div className={styles.txt}>
        <p style={{ whiteSpace: "pre-wrap" }}>{memo.text}</p>

        {/* メモ内の画像を表示 */}
        {memo.image && memo.image.length > 0 && (
          <div className={styles.screenshot}>
            {memo.image.map((imgSrc, index) => {
              const decodeUrl = (url) => decodeURIComponent(url); // URLデコードを適用

              const fixedImgSrc = decodeUrl(
                imgSrc.startsWith("/uploads") ? getUrl(`${imgSrc}`) : getUrl(`/uploads/${imgSrc}`)
              );

              console.log(`修正後の画像URL: ${fixedImgSrc}`);

              return (
                <img
                  key={index}
                  src={fixedImgSrc}
                  alt={`メモ画像 ${index + 1}`}
                  className={styles.memoImage}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  return memo.isEditing ? <AddMemoBox memo={memo} /> : editingOff;
};
