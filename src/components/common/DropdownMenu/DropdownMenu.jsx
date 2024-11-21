import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../../pages/app.css";
import styles from "./DropdownMenu.module.scss";

export const DropdownMenu = () => {
  return (
    <div className={styles.dropdown}>
      <Link className={styles.dropdownButton} to="/dashboard">
        <img src="/img/icon_user.svg" alt="" />
        ニックネーム
      </Link>

      <div className={styles.dropdown_content}>
        <Link to="/dashboard">本棚</Link>
        <Link to="/">ログアウト</Link>
      </div>
    </div>
  );
};
