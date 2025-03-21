// 指定した id の本の詳細情報を取得するフック
import { useEffect, useState } from "react";
import { getUrl } from "../../utils/urls";

export const useBook = (id) => {
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // ローディング状態を追加

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true); // 取得開始時に true にする

    const fetchData = async () => {
      try {
        //fetchを使い、指定したエンドポイントに対してHTTPリクエストを送信。idをクエリパラメータとしてURLに追加。サーバーがレスポンスを返すまで待機。
        const res = await fetch(getUrl(`/books/getBookInfoById?id=${id}`));
        //サーバーからのレスポンスが200 OK以外の場合はエラーとして扱い、ログを出力。
        if (!res.ok) {
          console.error("本の情報取得に失敗しました");
          setIsLoading(false);
          return;
        }

        const data = await res.json(); //レスポンスをJSON形式に変換
        setBook(data); //取得したデータをbookに格納
        console.log(data);
      } catch (error) {
        console.error("エラー:", error);
      } finally {
        setIsLoading(false); // 成功・失敗に関わらず、取得完了後に false にする
      }
    };

    fetchData();
  }, [id]);

  //フックの戻り値としてbookを返却。呼び出し元では、このbookを利用して本の情報を表示。
  //{book.title}、{book.author}などで使える。
  return {
    book,
    isLoading,
  };
};
