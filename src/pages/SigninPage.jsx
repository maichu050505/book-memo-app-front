import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./app.scss";
import { Header } from "../components/common/Header/Header.jsx";
import { Main } from "../components/common/Main/Main.jsx";
import { BackButton } from "../components/common/BackButton/BackButton.jsx";
import { Input } from "../components/common/login/Input/Input.jsx";
import { SubmitButton } from "../components/common/SubmitButton.jsx";
import { SubLink } from "../components/common/login/SubLink/SubLink.jsx";
import { Heading } from "../components/common/Heading/Heading.jsx";
import { useRegister } from "../hooks/users/useRegister.js";

export const SigninPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { registerUser, loading, error, success } = useRegister();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser({ username, password, passwordConfirm });
  };

  // 登録が成功した場合にアラートを表示し、/dashboard/ へ遷移
  useEffect(() => {
    if (success) {
      window.alert("会員登録が完了しました！");
      navigate("/dashboard/");
    }
  }, [success, navigate]);

  return (
    <>
      <Header />
      <Main
        width="648"
        children={[
          <BackButton key="backButton" />,
          <Heading key="pageTitle" type="h2" children="会員登録" />,

          <form key="form" onSubmit={handleSubmit}>
            <div>
              <Heading type="h3" children="ニックネーム" />
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="ニックネーム"
              />
            </div>
            <div>
              <Heading type="h3" children="パスワード" />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="パスワード"
              />
            </div>
            <div>
              <Heading type="h3" children="パスワード（確認用）" />
              <Input
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                placeholder="パスワード（確認用）"
              />
            </div>
            <div>
              <SubmitButton type="submit" disabled={loading}>
                {loading ? "登録中..." : "会員登録"}
              </SubmitButton>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
          </form>,
          <SubLink
            key="subLink"
            linkTo="/login"
            title="アカウントをお持ちの方"
            children="ログイン"
          />,
        ]}
      />
    </>
  );
};
