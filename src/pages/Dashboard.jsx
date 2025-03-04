import "./app.scss";
import { useState } from "react";
import { Header } from "../components/common/Header/Header.jsx";
import { Searchbox } from "../components/common/Searchbox/Searchbox.jsx";
import { DropdownMenu } from "../components/common/DropdownMenu/DropdownMenu.jsx";
import { Main } from "../components/common/Main/Main.jsx";
import { Bookshelf } from "../components/bookshelf/Bookshelf/Bookshelf.jsx";

export const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState("all"); // 現在のタブを管理

  return (
    <>
      <Header children={[<Searchbox key="searchbox" />, <DropdownMenu key="dropdownMenu" />]} />
      <Main width="1000">
        {/* タブのヘッダー */}
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

        {/* タブに応じたフィルターを渡す */}
        <Bookshelf key={selectedTab} filter={selectedTab} />
      </Main>
    </>
  );
};
