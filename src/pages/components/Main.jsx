import styles from "./Main.module.scss";

export const Main = ({ width, children }) => {
  return (
    <main className={styles[`main_w${width}`]}>
      <div>{children}</div>
    </main>
  );
};
