import { createContext, useState, useEffect } from "react";
import { getBookStatus } from "../../hooks/books/getBookStatus.js";
import { updateBookStatus } from "../../hooks/books/updateBookStatus.js";

export const StatusContext = createContext({});

export const StatusProvider = ({ children, initialBookId }) => {
  // 初期値として、親から渡された bookId を使用
  const [bookId, setBookId] = useState(initialBookId || null);
  //編集モード切り替え
  const [wantToRead, setWantToRead] = useState(true);
  const [readingNow, setReadingNow] = useState(false);
  const [readed, setReaded] = useState(false);

  // ページ読み込み時に現在のステータスを取得する
  useEffect(() => {
    if (bookId) {
      getBookStatus(bookId)
        .then((data) => {
          // data.status の値に応じてローカルステートを更新
          setWantToRead(data.status === "WANT_TO_READ");
          setReadingNow(data.status === "READING_NOW");
          setReaded(data.status === "READ");
        })
        .catch((error) => {
          console.error("現在のステータス取得に失敗:", error);
        });
    }
  }, [bookId]);

  // APIを呼んでステータスを更新する関数
  const changeStatus = async (newStatus) => {
    if (!bookId) {
      console.error("Book IDが設定されていません。");
      return;
    }
    try {
      // バックエンドのAPIを呼び出してデータベース上のステータスを更新
      await updateBookStatus(bookId, newStatus);
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
      }}
    >
      {children}
    </StatusContext.Provider>
  );
};
