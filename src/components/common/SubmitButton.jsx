import "../../pages/app.scss";

export const SubmitButton = ({ children, className, onClick, type = "button" }) => {
  return (
    <div className={className}>
      <button className="linkButton middle blue center" onClick={onClick} type={type}>
        {children}
      </button>
    </div>
  );
};
