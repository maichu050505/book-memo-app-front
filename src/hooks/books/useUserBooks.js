// ユーザーの本棚に登録されている全ての本リストを取得するためのフック
import { useEffect, useState } from "react";
import { getUrl } from "../../utils/urls";

export const useUserBooks = (userId, filter = "all") => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) return;

    const fetchBookshelf = async () => {
      setLoading(true);
      setError("");
      try {
        // token を localStorage から取得
        const token = localStorage.getItem("token");
        const response = await fetch(
          // `http://localhost:3000/users/${userId}/bookshelf?filter=${filter}`,
          getUrl(`/users/${userId}/bookshelf?filter=${filter}`),
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("本棚のデータ取得に失敗しました");
        }
        const data = await response.json();
        setBooks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookshelf();
  }, [userId, filter]);

  return { books, loading, error };
};
