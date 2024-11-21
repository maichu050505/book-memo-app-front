import { Link } from "react-router-dom";
import "../../../pages/app.scss";

export const BookInfoButton = ({ linkTo, buttonColor, children }) => {
  return (
    <Link to={linkTo} className={`linkButton ${buttonColor}`}>
      {children}
    </Link>
  );
};
