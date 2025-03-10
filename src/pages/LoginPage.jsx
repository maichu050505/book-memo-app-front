// ログイン時の処理の流れ
// 1. ユーザーがフォームに username と password を入力してログインボタンをクリック。
// 2. handleSubmit 関数が呼ばれ、バックエンドの /login API に POST リクエストを送信。
// 3. バックエンドで認証に成功すると JWT が返され、React 側で localStorage に保存される。
// 4. ログイン成功後、ユーザーは /dashboard/ に遷移。

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./app.scss";
import { Header } from "../components/common/Header/Header.jsx";
import { Main } from "../components/common/Main/Main.jsx";
import { BackButton } from "../components/common/BackButton/BackButton.jsx";
import { Input } from "../components/common/login/Input/Input.jsx";
import { SubLink } from "../components/common/login/SubLink/SubLink.jsx";
import { SubmitButton } from "../components/common/SubmitButton.jsx";
import { Heading } from "../components/common/Heading/Heading.jsx";
import { useLogin } from "../hooks/users/useLogin.js";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser, loading, error } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser({ username, password });
      navigate("/dashboard/");
    } catch (err) {
      // エラーは useLogin 内で setError しているので、ここで別途処理しなくてもOK
      console.error("ログインエラー:", err);
    }
  };

  // ログイン状態を確認する
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("ログイン状態: ユーザーはログインしています。");
    } else {
      console.log("ログイン状態: ユーザーはログインしていません。");
    }
  }, []);

  return (
    <>
      <Header />
      <Main width="648">
        <BackButton key="backButton" />
        <Heading key="pageTitle" type="h2" children="ログイン" />
        <Heading key="h3_email" type="h3" children="ユーザーネーム" />
        <Input
          label="ユーザーネーム"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder=""
        />
        <Heading key="h3_password" type="h3" children="パスワード" />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder=""
        />
        <SubmitButton type="submit" onClick={handleSubmit} className="blue" children="ログイン" />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <SubLink
          key="subLink"
          linkTo="/signin"
          title="アカウントをお持ちでない方"
          children="会員登録"
        />
      </Main>
    </>
  );
};
