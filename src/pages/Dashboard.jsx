import "./app.scss";
import { useState, useContext } from "react";
import { Header } from "../components/common/Header/Header.jsx";
import { Searchbox } from "../components/common/Searchbox/Searchbox.jsx";
import { DropdownMenu } from "../components/common/DropdownMenu/DropdownMenu.jsx";
import { Main } from "../components/common/Main/Main.jsx";
import { Bookshelf } from "../components/bookshelf/Bookshelf/Bookshelf.jsx";
import { HeaderButton } from "../components/common/HeaderButton/HeaderButton.jsx";
import { AuthContext } from "../components/providers/AuthProvider.jsx";

export const Dashboard = () => {
  const { user } = useContext(AuthContext); // ユーザー情報を取得
  const [selectedTab, setSelectedTab] = useState("all"); // 選択中のタブ

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
      {user ? (
        // ログイン状態: タブ付きの本棚表示
        <Main width="1000">
          <div className="tabs">
            <button
              className={`tabItem ${selectedTab === "all" ? "active" : ""}`}
              onClick={() => setSelectedTab("all")}
            >
              すべて
            </button>
            <button
              className={`tabItem ${selectedTab === "want" ? "active" : ""}`}
              onClick={() => setSelectedTab("want")}
            >
              読みたい
            </button>
            <button
              className={`tabItem ${selectedTab === "now" ? "active" : ""}`}
              onClick={() => setSelectedTab("now")}
            >
              今読んでいる
            </button>
            <button
              className={`tabItem ${selectedTab === "done" ? "active" : ""}`}
              onClick={() => setSelectedTab("done")}
            >
              読み終わった
            </button>
          </div>
          <Bookshelf key={selectedTab} filter={selectedTab} />
        </Main>
      ) : (
        // ログアウト状態: 全ての本を表示
        <Main width="1000">
          <Bookshelf key="bookshelf" />
        </Main>
      )}
    </>
  );
};
