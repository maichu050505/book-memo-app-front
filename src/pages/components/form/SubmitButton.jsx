import "../../app.scss";
import styles from "./form/SubmitButton.module.scss";

export const SubmitButton = ({ children }) => {
  return (
    <div className={styles.submitButton}>
      <button className="linkButton middle blue center">{children}</button>
    </div>
  );
};
