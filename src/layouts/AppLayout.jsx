import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/common/Header/Header.jsx"; // ヘッダーをインポート
import { Main } from "../components/common/Main/Main.jsx";

export const AppLayout = () => {
  console.log('Rendering AppLayout'); // AppLayout がレンダリングされるか確認
  return (
    <>
      <Header />
      <Main>
        <Outlet /> {/* ページごとのコンテンツを動的にレンダリング */}
      </Main>
    </>
  );
};
