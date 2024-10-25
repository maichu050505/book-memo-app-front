import "./app.scss";
import styles from "./components/Main.module.scss";
import { Header } from "./components/header/Header.jsx";
import { Main } from "./components/Main.jsx";
import { BackButton } from "./components/BackButton.jsx";
import { PageTitle } from "./components/PageTitle.jsx";
import { Input } from "./components/form/Input.jsx";
import { SubLink } from "./components/SubLink.jsx";
import { SubmitButton } from "./components/form/SubmitButton.jsx";
import { H3 } from "./components/H3.jsx";
import { Form } from "./components/form/Form.jsx";

export const LoginPage = () => {
  return (
    <>
      <Header />
      <Main width="648">
        <BackButton key="backButton" />
        <PageTitle key="pageTitle" children="ログイン" />
        <H3 key="h3_email" children="メールアドレス" />
        <Input key="email" label="メールアドレス" type="email" />
        <H3 key="h3_password" children="パスワード" />
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
