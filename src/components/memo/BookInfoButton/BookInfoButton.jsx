import { Link } from "react-router-dom";
import "../../../pages/app.scss";

export const BookInfoButton = ({ linkTo, buttonColor, children }) => {
  // 外部リンクかどうかを判定
  const isExternal = linkTo.startsWith("http");

  return isExternal ? (
    <a
      href={linkTo}
      className={`linkButton ${buttonColor}`}
      target="_blank"
      rel="noopener noreferrer" // セキュリティ対策
    >
      {children}
    </a>
  ) : (
    <Link to={linkTo} className={`linkButton ${buttonColor}`}>
      {children}
    </Link>
  );
};
