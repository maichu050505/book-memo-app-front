import { Meatball } from "../Meatball/Meatball";
import styles from "./MemoBox.module.scss";
import { AddMemoBox } from "../AddMemoBox/AddMemoBox.jsx";
import { getUrl } from "../../../utils/urls.jsx";

export const MemoBox = ({ memo }) => {
  console.log("MemoBoxでのmemo:", memo);
  console.log("MemoBoxの画像 (JSON):", JSON.stringify(memo.memoImg));

  // APIが memo.memoImg（"||"連結）でも、memo.image（配列）でも表示できるよう正規化
  let imagesArray = [];
  if (Array.isArray(memo?.image)) {
    imagesArray = memo.image;
  } else if (typeof memo?.memoImg === "string") {
    imagesArray = memo.memoImg.split("||").filter(Boolean);
  } else {
    imagesArray = [];
  }

  console.log("修正後の画像配列:", imagesArray);

  const editingOff = (
    <div className={styles.memoBox}>
      <Meatball type="editAndDeleteMemo" memoId={memo.id} />
      <div className={styles.txt}>
        <p style={{ whiteSpace: "pre-wrap" }}>{memo.text}</p>

        {/* メモ内の画像を表示 */}
        {imagesArray && imagesArray.length > 0 && (
          <div className={styles.screenshot}>
            {imagesArray.map((imgSrc, index) => {
              const decodeUrl = (url) => decodeURIComponent(url);
              // Supabase の絶対URLはそのまま、相対なら getUrl でバックエンドに解決
              const fixedImgSrc = decodeUrl(
                imgSrc.startsWith("http")
                  ? imgSrc
                  : imgSrc.startsWith("/uploads")
                  ? getUrl(imgSrc)
                  : getUrl(`/uploads/${imgSrc}`)
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
