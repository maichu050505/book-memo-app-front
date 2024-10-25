import "../app.scss";
import styles from "./SubLink.module.scss";
import { Link } from "react-router-dom";
import { H3 } from "./H3.jsx";

export const SubLink = ({ title, children, linkTo }) => {
  return (
    <div className={styles.sublink}>
      <H3 key="h3_email" children={title} />
      <Link to={linkTo} className="linkButton middle white_blue center" children={children} />
    </div>
  );
};
