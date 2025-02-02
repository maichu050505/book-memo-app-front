import { useContext } from "react";
import { ReviewContext } from "../../providers/ReviewProvider.jsx";
import { MemoContext } from "../../providers/MemoProvider.jsx";
import { StatusContext } from "../../providers/StatusProvider.jsx";
import styles from "./Meatball.module.scss";

export const Meatball = ({ type, memoId }) => {
  const { setIsEditingReview, setReview, setRating, setDate, bookId } = useContext(ReviewContext);
  const { toggleEditMemo, deleteMemo } = useContext(MemoContext);
  const { setWantToRead, setReadingNow, setReaded } = useContext(StatusContext);
  const onEditReview = () => {
    setIsEditingReview(true); // 編集モードにする
  };

  const onDeleteReview = async () => {
    const isConfirmed = window.confirm("本当に削除して良いですか？");
    if (isConfirmed) {
      setReview(""); // 初期化
      setRating(0); // 初期化
      setDate(null); // 初期化
      setIsEditingReview(true); // 編集モードを終了
      try {
        const url = `http://localhost:3000/books/reviews/${bookId}`;

        // サーバーにDELETEリクエストを送信
        const res = await fetch(url, {
          method: "DELETE",
        });

        if (!res.ok) {
          throw new Error("レビューの削除に失敗しました");
        }

        const result = await res.json();
        console.log(result.message); // 成功メッセージ
      } catch (error) {
        console.error("レビュー削除エラー:", error);
      }
    }
  };


  const onEditMemo = () => {
    console.log(`Entering edit mode for memo with id: ${memoId}`);
    toggleEditMemo(memoId, true); // 特定のメモを編集モードにする
  };

  const onDeleteMemo = async (memoId) => {
    const isConfirmed = window.confirm("本当に削除して良いですか？");
    if (isConfirmed) {
      try {
        const url = `http://localhost:3000/memos/${bookId}/${memoId}`;
        console.log(`Deleting memo with URL: ${url}`);

        const res = await fetch(url, {
          method: "DELETE",
        });

        if (!res.ok) {
          throw new Error("メモの削除に失敗しました");
        }

        const data = await res.json();
        console.log("サーバーからの応答:", data);

        // 状態を更新して削除を反映
        deleteMemo(memoId);
        // alert("メモが削除されました！");
      } catch (error) {
        console.error("メモ削除エラー:", error);
        alert("メモの削除に失敗しました。もう一度お試しください。");
      }
    }
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
            onClick={() => {
              if (type === "editAndDeleteReview") {
                onDeleteReview();
              } else if (type === "editAndDeleteMemo" && memoId) {
                onDeleteMemo(memoId); // memoId が存在する場合のみ削除を実行
              }
            }}
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
