import "../../app.scss";

export const BookshelfTabs = () => {
  return (
    <ul className="tab">
      <li className="tabItem all active">すべて</li>
      <li className="tabItem want">読みたい</li>
      <li className="tabItem now">今読んでいる</li>
      <li className="tabItem done">読み終わった</li>
    </ul>
  );
};
