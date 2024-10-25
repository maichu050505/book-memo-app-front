import { Link } from "react-router-dom";
import "../app.scss";
import styles from "./BookInfoButton.module.scss";

export const BookInfoButton = ({ linkTo, buttonColor, children }) => {
  return (
    <Link to={linkTo} className={`linkButton ${buttonColor}`}>
      {children}
    </Link>
  );
};
