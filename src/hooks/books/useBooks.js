import { useEffect, useState } from "react";

export const useBook = (id) => {
  const [book, setBook] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      //fetchを使い、指定したエンドポイントに対してHTTPリクエストを送信。idをクエリパラメータとしてURLに追加。サーバーがレスポンスを返すまで待機。
      const res = await fetch("http://localhost:3000/books/getBookInfoById?id=" + id);
      //サーバーからのレスポンスが200 OK以外の場合はエラーとして扱い、ログを出力。
      if (!res.ok) {
        console.error("本の情報取得に失敗しました");
        return;
      }

      const data = await res.json(); //レスポンスをJSON形式に変換
      setBook(data); //取得したデータをbookに格納
      console.log(data);
    };

    fetchData();
  }, [id]);

    //フックの戻り値としてbookを返却。呼び出し元では、このbookを利用して本の情報を表示。
    //{book.title}、{book.author}などで使える。
  return {
    book,
  };
}