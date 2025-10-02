import { useState, useContext, useEffect } from "react";
import { ReviewContext } from "../../providers/ReviewProvider.jsx";
import { MemoContext } from "../../providers/MemoProvider.jsx";
import { useAllReviews } from "../../../hooks/books/useAllReviews.js";
import "../../../pages/app.scss";
import { EditReview } from "../EditReview/EditReview.jsx";
import { ReviewBox } from "../ReviewBox/ReviewBox.jsx";
import { MemoBox } from "../../../components/memo/MemoBox/MemoBox.jsx";
import { Heading } from "../../../components/common/Heading/Heading.jsx";
import { Status } from "../Status/Status.jsx";
import { AddMemoBox } from "../../../components/memo/AddMemoBox/AddMemoBox.jsx";
import { AuthContext } from "../../providers/AuthProvider";
import { getUrl } from "../../../utils/urls.jsx";
import styles from "./Tabs.module.css";

export const Tabs = () => {
  const { user } = useContext(AuthContext);
  const [selectedTab, setSelectedTab] = useState(user ? "myMemo" : "others"); // ログイン状態で初期タブを変更
  const {
    isEditingReview,
    setReview,
    setRating,
    setDate,
    setIsEditingReview,
    bookId,
    review,
    rating,
  } = useContext(ReviewContext);
  const { memos } = useContext(MemoContext);

  // ここは自分のレビュー取得用
  useEffect(() => {
    const initializeReview = async () => {
      try {
        if (!user) return; // ログアウト時は取得しない
        const token = localStorage.getItem("token");
        const res = await fetch(getUrl(`/users/${user.id}/bookshelf/${bookId}/reviews`), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error("レビューの取得に失敗しました");
        }
        const data = await res.json();

        console.log("取得したレビュー:", data);

        // レビューが存在するか確認
        if (data && data.bookId === Number(bookId)) {
          // レビューが存在する場合は状態を更新
          setReview(data.reviewText);
          setRating(data.rating || 0);
          setDate(data.date || new Date().toLocaleDateString());
          setIsEditingReview(false); // 表示モード
        } else {
          // レビューが存在しない場合は編集モードに
          setReview("");
          setRating(0);
          setIsEditingReview(true); // 編集モード
        }
      } catch (error) {
        console.error("レビューの取得に失敗しました:", error);
        setReview("");
        setRating(0);
        setIsEditingReview(true); // エラー時は編集モード
      }
    };

    if (bookId) {
      initializeReview();
    }
  }, [bookId, setReview, setRating, setDate, setIsEditingReview, user]);

  // 他ユーザーも含めた全レビューを取得するカスタムフック
  const { reviews: allReviews, loading: loadingOthers, error: errorOthers } = useAllReviews(bookId);

  return (
    <div className="tabs-container">
      {/* ログイン状態のときだけタブを表示 */}
      {user && (
        <div className="tabs">
          {/* タブのヘッダー */}
          <button
            className={`tabItem ${selectedTab === "myMemo" ? "active" : ""}`}
            onClick={() => setSelectedTab("myMemo")}
          >
            自分の読書メモ
          </button>
          <button
            className={`tabItem ${selectedTab === "others" ? "active" : ""}`}
            onClick={() => setSelectedTab("others")}
          >
            みんなの評価と感想
          </button>
        </div>
      )}

      {/* ログアウト時は `others` タブの中身だけを表示 */}
      {/* タブの内容 */}
      <div className="tab-content-container">
        {selectedTab === "myMemo" && user && (
          <div className="tab-content">
            <Heading key="h3_status" type="h3" children="読書状況" />
            <Status key="status" />
            <Heading key="h3_review" type="h3" children="評価と感想" />
            {isEditingReview ? (
              <EditReview key="editReview" />
            ) : (
              <ReviewBox key="reviewBox" review={{ user }} />
            )}
            <Heading key="h3_memo" type="h3">
              読書メモ
              <br />
              <span className={styles.notice}>※あなたにしか見えません</span>
              <br />
              <span className={styles.notice}>
                ※ 1つのメモにつき画像は最大10枚、1枚あたり5MBまでアップロードできます。
              </span>
            </Heading>
            {/* 新規メモの入力ボックスは常に表示 */}
            <AddMemoBox key="addMemoBox" type="add" />
            {/* 既存のメモをリスト表示。編集モード制御は MemoBox 側で行う */}
            {memos.map((memo) => (
              <MemoBox key={memo.id} memo={memo} />
            ))}
          </div>
        )}
        {(selectedTab === "others" || !user) && (
          <div className="tab-content">
            <Heading key="h3_review" type="h3" children="評価と感想" />
            {loadingOthers ? (
              <p>読み込み中…</p>
            ) : errorOthers ? (
              <p style={{ color: "red" }}>{errorOthers}</p>
            ) : allReviews.length === 0 ? (
              <p>レビューはまだありません</p>
            ) : (
              allReviews.map((rev) => <ReviewBox key={rev.id} review={rev} hideMeatball={true} />)
            )}
          </div>
        )}
      </div>
    </div>
  );
};
