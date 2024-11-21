import { useContext } from "react";
import { ReviewContext } from "../../providers/ReviewProvider.jsx";
import { MemoContext } from "../../providers/MemoProvider.jsx";
import { StatusContext } from "../../providers/StatusProvider.jsx";
import styles from "./Meatball.module.scss";

export const Meatball = ({ type, memoId }) => {
  const { setIsEditingReview, setReview, setRating } = useContext(ReviewContext);
  const { toggleEditMemo, deleteMemo } = useContext(MemoContext);
  const { setWantToRead, setReadingNow, setReaded } = useContext(StatusContext);
  const onEditReview = () => {
    setIsEditingReview(true); // 編集モードにする
  };

  const onDeleteReview = () => {
    setIsEditingReview(true); // 編集モードにする
    setReview(""); //初期化
    setRating(0); //初期化
  };

  const onEditMemo = () => {
    toggleEditMemo(memoId); // 特定のメモを編集モードにする
  };

  const onDeleteMemo = () => {
    deleteMemo(memoId); //特定のメモを削除;
  };

  const onWantToRead = () => {
    setWantToRead(true);
    setReadingNow(false);
    setReaded(false);
  }

  const onReadingNow = () => {
    setWantToRead(false);
    setReadingNow(true);
    setReaded(false);
  };

  const onReaded = () => {
    setWantToRead(false);
    setReadingNow(false);
    setReaded(true);
  };

  // ドロップダウンメニューの内容を生成する関数
  const renderMenuItems = () => {
    if (type === "editAndDeleteReview" || type === "editAndDeleteMemo") {
      return (
        <>
          <li
            className={styles.edit}
            onClick={type === "editAndDeleteReview" ? onEditReview : onEditMemo}
          >
            編集する
          </li>
          <li
            className={styles.delete}
            onClick={type === "editAndDeleteReview" ? onDeleteReview : onDeleteMemo}
          >
            削除する
          </li>
        </>
      );
    }

    if (type === "editStatus") {
      return (
        <>
          <li className={styles.edit} onClick={onWantToRead}>
            読みたい
          </li>
          <li className={styles.edit} onClick={onReadingNow}>
            今読んでいる
          </li>
          <li className={styles.edit} onClick={onReaded}>
            読み終わった
          </li>
        </>
      );
    }

    return null; // その他のtypeがあればここで処理
  };

  // 共通のドロップダウンメニューのコンポーネント
  return (
    <div className={styles.icon_meatball}>
      <img src="./img/icon_meatball.svg" alt="編集する" />
      <div className={styles.dropdown}>
        <ul>{renderMenuItems()}</ul>
      </div>
    </div>
  );
};
