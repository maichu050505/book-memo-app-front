import React, { useState, useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";
import "../../../pages/app.css";
import styles from "./DropdownMenu.module.scss";

export const DropdownMenu = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className={styles.dropdown}>
      <Link className={styles.dropdownButton} to="/dashboard">
        <img src="/img/icon_user.svg" alt="" />
        {user ? user.username : "ゲスト"}
      </Link>

      <div className={styles.dropdown_content}>
        <Link to="/dashboard">本棚</Link>
        <Link to="/">ログアウト</Link>
      </div>
    </div>
  );
};
