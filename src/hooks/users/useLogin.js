// このフックは、ログイン処理を実行し、成功時は JWT を保存し、エラー時はエラーメッセージを state で管理します。
import { useState, useContext } from "react";
import { AuthContext } from "../../components/providers/AuthProvider";
import { jwtDecode } from "../../utils/jwtDecode";
import { resetSessionExpired } from "../../utils/fetchWithAuth"; // セッション切れフラグ（sessionExpired）のリセット関数をインポート
import { getUrl } from "../../utils/urls";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser } = useContext(AuthContext);

  const loginUser = async ({ username, password }) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(getUrl("/login"), {
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

      // JWT をデコードしてユーザー情報をセット
      const decoded = jwtDecode(data.token);
      setUser(decoded);
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
