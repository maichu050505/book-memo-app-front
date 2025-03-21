import { useContext } from "react";
import { ReviewContext } from "../../providers/ReviewProvider.jsx";
import { MemoContext } from "../../providers/MemoProvider.jsx";
import { StatusContext } from "../../providers/StatusProvider.jsx";
import { AuthContext } from "../../providers/AuthProvider.jsx";
import { getUrl } from "../../../utils/urls.jsx";
import styles from "./Meatball.module.scss";

export const Meatball = ({ type, memoId }) => {
  const { user } = useContext(AuthContext);
  const {
    setIsEditingReview,
    setReview,
    setRating,
    setDate,
    bookId,
    setReviews, // レビュー一覧を更新する
    reviews,
    toggleReviewUpdated, // レビュー削除後に即時反映
  } = useContext(ReviewContext);
  const { toggleEditMemo, deleteMemo } = useContext(MemoContext);
  const { setWantToRead, setReadingNow, setReaded } = useContext(StatusContext);
  const onEditReview = () => {
    setIsEditingReview(true); // 編集モードにする
  };
  const { changeStatus } = useContext(StatusContext);

  const onDeleteReview = async () => {
    const isConfirmed = window.confirm("本当に削除して良いですか？");
    if (!isConfirmed) return;
    if (isConfirmed) {
      try {
        const token = localStorage.getItem("token");
        const url = getUrl(`/users/${user.id}/bookshelf/${bookId}/reviews`);

        // サーバーにDELETEリクエストを送信
        const res = await fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("レビューの削除に失敗しました");
        }

        const result = await res.json();
        console.log(result.message); // 成功メッセージ
        // 削除したレビューを一覧から削除
        setReviews((prevReviews) => prevReviews.filter((r) => r.userId !== user.id));

        // BookInfoBox.jsx の useEffect を発火させる
        toggleReviewUpdated();

        // レビューの状態をクリア
        setReview("");
        setRating(0);
        setDate(null);

        // 編集モードを終了
        setIsEditingReview(true);
      } catch (error) {
        console.error("レビュー削除エラー:", error);
      }
    }
  };

  const onEditMemo = () => {
    console.log("受け取った memoId:", memoId);
    if (!memoId) {
      console.error("メモのIDが undefined です。編集モードにできません。");
      return;
    }
    console.log(`Editing memo with id: ${memoId}`);
    toggleEditMemo(Number(memoId), true);
  };

  const onDeleteMemo = async (memoId) => {
    if (!memoId) {
      console.error("削除対象のメモIDが undefined です。");
      return;
    }

    memoId = Number(memoId); // IDを数値に変換
    console.log(`Trying to delete memo with id: ${memoId}`); // デバッグログを追加

    const isConfirmed = window.confirm("本当に削除して良いですか？");
    if (isConfirmed) {
      try {
        const token = localStorage.getItem("token");
        const url = getUrl(`/users/${user.id}/bookshelf/${bookId}/memos/${memoId}`);
        console.log(`Deleting memo with URL: ${url}`);

        const res = await fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
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

  const onWantToRead = async () => {
    try {
      await changeStatus("WANT_TO_READ");
    } catch (error) {
      console.error("更新失敗:", error);
    }
  };

  const onReadingNow = async () => {
    try {
      await changeStatus("READING_NOW");
    } catch (error) {
      console.error("更新失敗:", error);
    }
  };

  const onReaded = async () => {
    try {
      await changeStatus("READ");
    } catch (error) {
      console.error("更新失敗:", error);
    }
  };

  // const onWantToRead = () => {
  //   setWantToRead(true);
  //   setReadingNow(false);
  //   setReaded(false);
  // };

  // const onReadingNow = () => {
  //   setWantToRead(false);
  //   setReadingNow(true);
  //   setReaded(false);
  // };

  // const onReaded = () => {
  //   setWantToRead(false);
  //   setReadingNow(false);
  //   setReaded(true);
  // };

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
                onDeleteMemo(Number(memoId)); // memoId が存在する場合のみ削除を実行
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
