import styles from "./Input.module.scss";

export const Input = ({ type, className }) => {
  return (
    <div>
      <input type={type} className={styles.input} />
    </div>
  );
};
