import styles from "./Input.module.scss";

export const Input = ({ type, value, onChange, placeholder, label, className = "", ...rest }) => {
  return (
    <div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${styles.input} ${className}`}
        {...rest}
      />
    </div>
  );
};
