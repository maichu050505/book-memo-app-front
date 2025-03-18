import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../components/providers/AuthProvider";
import { fetchWithAuth } from "../../utils/fetchWithAuth";
import { getUrl } from "../../utils/urls";

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
          getUrl(`/users/${user.id}/bookshelf/${bookId}/status`)
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
