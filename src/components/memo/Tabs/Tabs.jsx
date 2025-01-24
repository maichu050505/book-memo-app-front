import { useState, useContext, useEffect } from "react";
import { ReviewContext } from "../../providers/ReviewProvider.jsx";
import { MemoContext } from "../../providers/MemoProvider.jsx";
import "../../../pages/app.scss";
import { EditReview } from "../EditReview/EditReview.jsx";
import { ReviewBox } from "../ReviewBox/ReviewBox.jsx";
import { MemoBox } from "../../../components/memo/MemoBox/MemoBox.jsx";
import { Heading } from "../../../components/common/Heading/Heading.jsx";
import { Status } from "../Status/Status.jsx";
import { AddMemoBox } from "../../../components/memo/AddMemoBox/AddMemoBox.jsx";


export const Tabs = () => {
  const [selectedTab, setSelectedTab] = useState("myMemo"); // 現在のタブを管理
  const { isEditingReview, setReview, setRating, setDate, setIsEditingReview, bookId, review, rating } =
    useContext(ReviewContext);
  const { memos } = useContext(MemoContext);

  useEffect(() => {
    const initializeReview = async () => {
      try {
        const res = await fetch(`http://localhost:3000/books/reviews/${bookId}`);
        const data = await res.json();

        console.log("サーバーから取得したデータ:", data);

        // レビューが存在するか確認
        if (data && data.bookId === bookId) {
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
  }, [bookId, setReview, setRating, setDate, setIsEditingReview]);

  return (
    <div className="tabs-container">
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
          他の人の評価と感想
        </button>
      </div>

      {/* タブの内容 */}
      <div className="tab-content-container">
        {selectedTab === "myMemo" && (
          <div className="tab-content">
            <Heading key="h3_review" type="h3" children="評価と感想" />
            {isEditingReview ? <EditReview key="editReview" /> : <ReviewBox key="reviewBox" />}
            <Heading key="h3_memo" type="h3">
              読書メモ<span>※あなたにしか見えません</span>
            </Heading>
            <AddMemoBox key="addMemoBox" type="add" />

            {memos.map((memo, index) => (
              <MemoBox key={`memoBox-${index}`} memo={memo} />
            ))}
            <Heading key="h3_status" type="h3" children="読書状況" />
            <Status key="status" />
          </div>
        )}
        {selectedTab === "others" && (
          <div className="tab-content">
            <Heading key="h3_review" type="h3" children="評価と感想" />
            <ReviewBox key="reviewBox" />
          </div>
        )}
      </div>
    </div>
  );
};
