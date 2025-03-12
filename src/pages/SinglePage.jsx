import "./app.scss";
import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Header } from "../components/common/Header/Header.jsx";
import { Searchbox } from "../components/common/Searchbox/Searchbox.jsx";
import { DropdownMenu } from "../components/common/DropdownMenu/DropdownMenu.jsx";
import { Main } from "../components/common/Main/Main.jsx";
import { BackButton } from "../components/common/BackButton/BackButton.jsx";
import { BookInfoBox } from "../components/memo/BookInfoBox/BookInfoBox.jsx";
import { Heading } from "../components/common/Heading/Heading.jsx";
import { Tabs } from "../components/memo/Tabs/Tabs.jsx";
import { HeaderButton } from "../components/common/HeaderButton/HeaderButton.jsx";
import { AuthContext } from "../components/providers/AuthProvider.jsx";
import { ReviewProvider } from "../components/providers/ReviewProvider.jsx";
import { MemoProvider } from "../components/providers/MemoProvider.jsx";
import { StatusProvider } from "../components/providers/StatusProvider.jsx";
import { useBook } from "../hooks/books/useBooks.js";

export const SinglePage = () => {
  const location = useLocation(); //現在のURLに関する情報を取得するために使う

  const params = new URLSearchParams(location.search);
  // location.searchには、クエリパラメータ部分が文字列として格納される。「?id=1」など。
  // location.searchを元にURLSearchParamsオブジェクトを作成。(key=valueのペアを管理するオブジェクトが作成)

  const id = params.get("id"); // params.get("id")は、URLSearchParamsのメソッドの一つで、指定したクエリパラメータのキーidに対応する値、すなわち1などが取得できる。
  console.log("取得したID:", id);

  const { book } = useBook(id);
  const { user } = useContext(AuthContext); // ユーザー情報を取得

  if (!book) {
    return <div>書籍データがありません</div>;
  }

  return (
    <>
      <Header>
        <Searchbox key="searchbox" /> {/* HeaderにSearchboxを配置 */}
        {user ? (
          // ログイン状態: ドロップダウンメニュー
          <DropdownMenu key="dropdownMenu" />
        ) : (
          // ログアウト状態: ログインと会員登録のリンク
          <>
            <HeaderButton key="loginButton" url="/login" buttonName="ログイン" />
            <HeaderButton key="signinButton" url="/signin" buttonName="会員登録" />
          </>
        )}
      </Header>
      <Main width="648">
        <BackButton key="backButton" />
        <Heading key="pageTitle" type="h2" children="本の詳細" />

        <StatusProvider initialBookId={Number(id)}>
          <ReviewProvider bookId={id}>
            <MemoProvider bookId={id}>
              <BookInfoBox key="bookInfoBox" book={book} buttonLinkTo="/dashboard" />
              <Tabs key="tabs" />
            </MemoProvider>
          </ReviewProvider>
        </StatusProvider>
      </Main>
    </>
  );
};
