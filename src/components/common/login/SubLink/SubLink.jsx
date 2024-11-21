import "../../../../pages/app.scss";
import styles from "./SubLink.module.scss";
import { Link } from "react-router-dom";
import { Heading } from "../../Heading/Heading.jsx";

export const SubLink = ({ title, children, linkTo }) => {
  return (
    <div className={styles.sublink}>
      <Heading key="h3_email" type="h3" children={title} />
      <Link to={linkTo} className="linkButton middle white_blue center" children={children} />
    </div>
  );
};
