import styles from "./PageTitle.module.scss";

export const PageTitle = ({ children }) => {
  return <h2 className={styles.pageTitle}>{children}</h2>;
};
