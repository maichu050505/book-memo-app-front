import "./app.scss";
import { Header } from "../components/common/Header/Header.jsx";
import { Main } from "../components/common/Main/Main.jsx";
import { BackButton } from "../components/common/BackButton/BackButton.jsx";
import { Input } from "../components/common/login/Input/Input.jsx";
import { SubLink } from "../components/common/login/SubLink/SubLink.jsx";
import { SubmitButton } from "../components/common/SubmitButton.jsx";
import { Heading } from "../components/common/Heading/Heading.jsx";

export const LoginPage = () => {
  return (
    <>
      <Header />
      <Main width="648">
        <BackButton key="backButton" />
        <Heading key="pageTitle" type="h2" children="ログイン" />
        <Heading key="h3_email" type="h3" children="メールアドレス" />
        <Input key="email" label="メールアドレス" type="email" />
        <Heading key="h3_password" type="h3" children="パスワード" />
        <Input key="password" type="password" />
        <SubmitButton key="submit" children="ログイン" className="blue" />
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
