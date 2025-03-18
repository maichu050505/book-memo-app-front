// hooks/useRegister.js
import { useState } from "react";
import { getUrl } from "../../utils/urls";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const registerUser = async ({ username, password, passwordConfirm }) => {
    setLoading(true);
    setError("");
    setSuccess("");

    // パスワードの一致チェックはここでも可能ですが、コンポーネント側で行ってもよいです
    if (password !== passwordConfirm) {
      setError("パスワードが一致しません");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(getUrl("/register"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, passwordConfirm }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "会員登録に失敗しました");
      } else {
        setSuccess("会員登録に成功しました！");
      }
    } catch (err) {
      setError("エラーが発生しました: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return { registerUser, loading, error, success };
};
