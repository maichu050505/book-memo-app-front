// hooks/books/useUpdateBookStatus.js
import { useState, useContext } from "react";
import { AuthContext } from "../../components/providers/AuthProvider";
import { fetchWithAuth } from "../../utils/fetchWithAuth";
import { getUrl } from "../../utils/urls";

export const useUpdateBookStatus = (bookId) => {
  const { user } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const updateStatus = async (newStatus) => {
    if (!bookId || !user) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetchWithAuth(getUrl(`/users/${user.id}/bookshelf/${bookId}/status`), {
        method: "PUT",
        headers: {
          // fetchWithAuth が Authorization と Content-Type を自動設定するため、ここは不要
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "本のステータス更新に失敗しました");
      }
      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message);
      console.error("updateBookStatus エラー:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateStatus, error, loading };
};
