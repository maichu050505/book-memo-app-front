import "./app.scss";
import styles from "./components/Main.module.scss";
import { Header } from "./components/header/Header.jsx";
import { Main } from "./components/Main.jsx";
import { BackButton } from "./components/BackButton.jsx";
import { PageTitle } from "./components/PageTitle.jsx";
import { Form } from "./components/form/Form.jsx";
import { Input } from "./components/form/Input.jsx";
import { SubmitButton } from "./components/form/SubmitButton.jsx";
import { SubLink } from "./components/SubLink.jsx";
import { H3 } from "./components/H3.jsx";

export const SigninPage = () => {
  return (
    <>
      <Header />
      <Main
        width="648"
        children={[
          <BackButton key="backButton" />,
          <PageTitle key="pageTitle" children="会員登録" />,
          <Form
            key="form"
            children={[
              <H3 key="h3_email" children="メールアドレス" />,
              <Input key="email" type="email" />,
              <H3 key="h3_password" children="パスワード" />,
              <Input key="password" type="password" />,
              <H3 key="h3_passwordConfirm" children="パスワード（確認用）" />,
              <Input key="passwordConfirm" type="password" />,
              <H3 key="h3_nickName" children="ニックネーム" />,
              <Input key="nickName" label="ニックネーム" type="text" />,
            ]}
          />,
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
