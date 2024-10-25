import styles from "";

export const SubmitButton = ({ className, children }) => {
  return (
    <>
      <button className={className}>{children}</button>
    </>
  );
};
