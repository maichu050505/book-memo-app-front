import "../../pages/app.scss";

export const SubmitButton = ({ children, className = "", onClick, type = "button", ...rest }) => {
  return (
    <div className={className}>
      <button className="linkButton middle blue center" onClick={onClick} type={type} {...rest}>
        {children}
      </button>
    </div>
  );
};
