import { Link, useNavigate } from "react-router-dom";
import styles from "./BackButton.module.scss";

export const BackButton = ({ to }) => {
  const navigate = useNavigate();
  
  const goBack = (e) => {
    e.preventDefault();

    if (to) {
      // 明示的に指定されたパスがある場合
      navigate(to);
    } else {
      // 履歴を基に戻る
      navigate(-1);
    }
  };
  return (
    <Link to="#" onClick={goBack} className={styles.backButton}>
      <img src="/img/icon_back.svg" alt="戻る" />
    </Link>
  );
};
