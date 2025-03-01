import { Link, useLocation } from "react-router-dom";
import React from "react";
import styles from "./Header.module.scss";

const HeaderComponent = ({ children }) => {
  console.log("Header received children:", children); // children が渡されているか確認
  const location = useLocation(); // 現在のURLパスを取得
  const isLogoutPage = ["/", "/login", "signin"].includes(location.pathname);

  return (
    <header className={styles.header}>
      <Link to={isLogoutPage ? "/" : "/dashboard"}>
        <h1 className={styles.header_logo}>
          <img src="/img/logo.svg" alt="ブクショ" />
        </h1>
      </Link>
      <div className={styles.header_inner}>{children}</div>
    </header>
  );
};

// メモ化。props（children など）が変わらない限り、再レンダリングが抑制される。
export const Header = React.memo(HeaderComponent);
