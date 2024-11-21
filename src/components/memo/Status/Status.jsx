import { useContext } from "react";
import { StatusContext } from "../../providers/StatusProvider.jsx";
import { Meatball } from "../Meatball/Meatball.jsx";
import styles from "./Status.module.scss";

export const Status = () => {
  const { wantToRead, readingNow, readed } = useContext(StatusContext);
  // 状態に応じた表示テキストを決定
  let statusText = "";
  if (wantToRead) {
    statusText = "読みたい";
  } else if (readingNow) {
    statusText = "今読んでいる";
  } else if (readed) {
    statusText = "読み終わった";
  }

  return (
    <div className={styles.status}>
      <Meatball type="editStatus" />
      <p>{statusText}</p>
    </div>
  );
};
