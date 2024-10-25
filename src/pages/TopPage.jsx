import "./app.scss";
import { Header } from "./components/header/Header.jsx";
import { Searchbox } from "./components/header/Searchbox.jsx";
import { HeaderButton } from "./components/header/HeaderButton.jsx";
import { Main } from "./components/Main.jsx";
import { Bookshelf } from "./components/bookshelf/Bookshelf.jsx";

export const TopPage = () => {
  return (
    <>
      <Header
        children={[
          <Searchbox key="searchbox" />,
          <HeaderButton key="loginButton" url="/login" buttonName="ログイン" />,
          <HeaderButton key="signinButton" url="/signin" buttonName="会員登録" />,
        ]}
      />
      <Main width="1000" children={[<Bookshelf key="bookshelf" />]} />
    </>
  );
};
