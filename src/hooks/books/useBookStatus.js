import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../components/providers/AuthProvider";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

export const useBookStatus = (bookId) => {
  const { user } = useContext(AuthContext);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bookId || !user) return;

    const getStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("トークンが存在しません");
        }
        const response = await fetchWithAuth(
          `http://localhost:3000/users/${user.id}/books/${bookId}/status`
        );
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "ステータス取得に失敗しました");
        }
        const data = await response.json();
        setStatus(data.status);
      } catch (err) {
        setError(err.message);
        console.error("getBookStatus エラー:", err);
      } finally {
        setLoading(false);
      }
    };

    getStatus();
  }, [bookId, user]);

  return { status, error, loading, setStatus };
};

// 読書状況を取得
// export async function getBookStatus(bookId) {
//   try {
//     const response = await fetch(`http://localhost:3000/books/${bookId}/status`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     if (!response.ok) {
//       throw new Error("ステータス取得に失敗しました");
//     }
//     return await response.json();
//   } catch (error) {
//     console.error("getBookStatus エラー:", error);
//     throw error;
//   }
// }
