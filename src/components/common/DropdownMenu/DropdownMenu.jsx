import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import "../../../pages/app.css";
import styles from "./DropdownMenu.module.scss";

export const DropdownMenu = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    // トークンを削除
    localStorage.removeItem("token");
    // AuthContext のユーザー情報をクリア
    if (setUser) {
      setUser(null);
    }
    // ログアウト後、トップページまたはログインページにリダイレクト
    navigate("/login");
  };

  return (
    <div className={styles.dropdown}>
      <Link className={styles.dropdownButton} to="/dashboard">
        <img src="/img/icon_user.svg" alt="" />
        {user ? user.username : "ゲスト"}
      </Link>

      <div className={styles.dropdown_content}>
        <Link to="/dashboard">本棚</Link>
        <Link to="/" onClick={handleLogout}>
          ログアウト
        </Link>
      </div>
    </div>
  );
};
