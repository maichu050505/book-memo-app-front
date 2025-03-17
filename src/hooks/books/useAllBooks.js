// データベースにある全ての本を取得するフック
import { useEffect, useState } from "react";

export const useAllBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await fetch(getUrl("/books"));
        if (!res.ok) {
          throw new Error("全ての本の取得に失敗しました");
        }
        const data = await res.json();
        setBooks(data.books || []);
      } catch (err) {
        console.error("全ての本の取得エラー:", err);
        setError("本の取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    fetchAllBooks();
  }, []);

  return { books, loading, error };
};
