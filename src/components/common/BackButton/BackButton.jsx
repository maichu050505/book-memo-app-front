import { Link, useNavigate } from "react-router-dom";
import styles from "./BackButton.module.scss";

export const BackButton = () => {
  const navigate = useNavigate();
  const goBack = (e) => {
    e.preventDefault();
    navigate(-1); //-1はブラウザの履歴で前のページに戻ることを意味する。
  };
  return (
    <Link to="#" onClick={goBack} className={styles.backButton}>
      <img src="/img/icon_back.svg" alt="戻る" />
    </Link>
  );
};
