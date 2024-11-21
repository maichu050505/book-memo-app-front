import "./app.scss";
import { Header } from "../components/common/Header/Header.jsx";
import { Searchbox } from "../components/common/Searchbox/Searchbox.jsx";
import { HeaderButton } from "../components/common/HeaderButton/HeaderButton.jsx";
import { Main } from "../components/common/Main/Main.jsx";
import { Bookshelf } from "../components/bookshelf/Bookshelf/Bookshelf.jsx";

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
      <button onClick={async () => {
        const res = await fetch("http://localhost:3000/books/search?title=Test");
        console.log(res);
        const json = await res.json();
        console.log(json);
      }}>
        test
      </button>
      <Main width="1000" children={[<Bookshelf key="bookshelf" />]} />
    </>
  );
};
