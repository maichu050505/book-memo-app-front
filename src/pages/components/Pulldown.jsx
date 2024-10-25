import styles from "./Pulldown.module.scss";
export const Pulldown = () => {
  return (
    <select className={styles.pulldown}>
      <option>読みたい</option>
      <option>今読んでいる</option>
      <option>読み終わった</option>
    </select>
  );
};
