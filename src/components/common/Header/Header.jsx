import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.scss";

export const Header = ({ children }) => {
  const location = useLocation(); //現在のURLパスを取得
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
