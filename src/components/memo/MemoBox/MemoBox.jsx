import { useContext } from "react";
import { Meatball } from "../Meatball/Meatball";
import styles from "./MemoBox.module.scss";
import { AddMemoBox } from "../AddMemoBox/AddMemoBox.jsx";
import { MemoContext } from "../../providers/MemoProvider.jsx";

export const MemoBox = ({ memo }) => {

  const editingOff = (
    <div className={styles.memoBox}>
      <Meatball type="editAndDeleteMemo" memoId={memo.id} />
      <div className={styles.txt}>
        {/* 改行を CSS で処理 */}
        <p style={{ whiteSpace: "pre-wrap" }}>{memo.text}</p>
        {/* 画像がある場合に複数画像を表示 */}
        {memo.image && memo.image.length > 0 && (
          <div className={styles.screenshotContainer}>
            {memo.image.map((image, index) => (
              <div key={index} className={styles.screenshot}>
                <img src={image} alt={`Memo Attachment ${index + 1}`} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return memo.isEditing ? <AddMemoBox memo={memo} /> : editingOff;
};
