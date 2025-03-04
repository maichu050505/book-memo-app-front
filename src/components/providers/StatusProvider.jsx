import { createContext, useState, useEffect } from "react";
import { useBookStatus } from "../../hooks/books/useBookStatus.js";
import { useUpdateBookStatus } from "../../hooks/books/useUpdateBookStatus.js";

export const StatusContext = createContext({});

export const StatusProvider = ({ children, initialBookId }) => {
  // 初期値として、親から渡された bookId を使用
  const [bookId, setBookId] = useState(initialBookId || null);

  // 編集モード切り替えのローカルステート
  const [wantToRead, setWantToRead] = useState(true);
  const [readingNow, setReadingNow] = useState(false);
  const [readed, setReaded] = useState(false);

  // カスタムフックをトップレベルで呼び出す
  const { status, error: statusError, loading } = useBookStatus(bookId);
  const { updateStatus, error: updateError, loading: updateLoading } = useUpdateBookStatus(bookId);

  // ページ読み込み時に現在のステータスを取得する
  // status の値が更新されたら、ローカルの状態を更新する
  useEffect(() => {
    if (status) {
      setWantToRead(status === "WANT_TO_READ");
      setReadingNow(status === "READING_NOW");
      setReaded(status === "READ");
    }
  }, [status]);

  // APIを呼んでステータスを更新する関数
  const changeStatus = async (newStatus) => {
    if (!bookId) {
      console.error("Book IDが設定されていません。");
      return;
    }
    try {
      // バックエンドのAPIを呼び出してデータベース上のステータスを更新
      await updateStatus(newStatus);
      // ローカルステートの更新
      setWantToRead(newStatus === "WANT_TO_READ");
      setReadingNow(newStatus === "READING_NOW");
      setReaded(newStatus === "READ");
    } catch (error) {
      alert("ステータスの更新に失敗しました。もう一度お試しください。");
    }
  };

  return (
    <StatusContext.Provider
      value={{
        wantToRead,
        setWantToRead,
        readingNow,
        setReadingNow,
        readed,
        setReaded,
        changeStatus,
        setBookId,
        statusError,
        updateError,
        loading: loading || updateLoading,
      }}
    >
      {children}
    </StatusContext.Provider>
  );
};
