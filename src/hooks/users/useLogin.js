// このフックは、ログイン処理を実行し、成功時は JWT を保存し、エラー時はエラーメッセージを state で管理します。
import { useState } from "react";
import { resetSessionExpired } from "../../utils/fetchWithAuth"; // セッション切れフラグ（sessionExpired）のリセット関数をインポート

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loginUser = async ({ username, password }) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "ログインに失敗しました");
      }

      // JWT を localStorage に保存
      localStorage.setItem("token", data.token);
      // ログイン成功時にセッション切れフラグをリセット
      resetSessionExpired();
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, loading, error };
};
