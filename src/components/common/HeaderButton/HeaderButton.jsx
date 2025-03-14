import { Link } from "react-router-dom";
import styles from "./HeaderButton.module.scss";

export const HeaderButton = ({ url, buttonName }) => {
  return (
    <Link to={url} className={styles.header_button}>
      {buttonName}
    </Link>
  );
};
