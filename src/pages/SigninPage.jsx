import "./app.scss";
import { Header } from "../components/common/Header/Header.jsx";
import { Main } from "../components/common/Main/Main.jsx";
import { BackButton } from "../components/common/BackButton/BackButton.jsx";
import { Input } from "../components/common/login/Input/Input.jsx";
import { SubmitButton } from "../components/common/SubmitButton.jsx";
import { SubLink } from "../components/common/login/SubLink/SubLink.jsx";
import { Heading } from "../components/common/Heading/Heading.jsx";

export const SigninPage = () => {
  return (
    <>
      <Header />
      <Main
        width="648"
        children={[
          <BackButton key="backButton" />,
          <Heading key="pageTitle" type="h2" children="会員登録" />,
          <Heading key="h3_email" type="h3" children="メールアドレス" />,
          <Input key="email" type="email" />,
          <Heading key="h3_password" type="h3" children="パスワード" />,
          <Input key="password" type="password" />,
          <Heading key="h3_passwordConfirm" type="h3" children="パスワード（確認用）" />,
          <Input key="passwordConfirm" type="password" />,
          <Heading key="h3_nickName" type="h3" children="ニックネーム" />,
          <Input key="nickName" label="ニックネーム" type="text" />,
          <SubmitButton key="submit" children="会員登録" />,
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
