import styles from "./Form.module.scss";

export const Form = ({ children }) => {
  return (
    <>
      <form className={styles.form}>{children}</form>
    </>
  );
};
