import "../app.scss";

export const AddMemo = ({ onAddTextarea }) => {
  return (
    <div className="add" onClick={onAddTextarea}>
      <button className="linkButton white_blue">メモを入力する</button>
    </div>
  );
};
