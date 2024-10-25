import "../app.scss";

export const Tabs = () => {
  return (
    <ul className="tab">
      <li className="tabItem active">自分の読書メモ</li>
      <li className="tabItem">他の人の評価と感想</li>
    </ul>
  );
};
