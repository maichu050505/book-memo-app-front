import "./app.scss";
import { Header } from "../components/common/Header/Header.jsx";
import { Searchbox } from "../components/common/Searchbox/Searchbox.jsx";
import { DropdownMenu } from "../components/common/DropdownMenu/DropdownMenu.jsx";
import { Main } from "../components/common/Main/Main.jsx";
import { Bookshelf } from "../components/bookshelf/Bookshelf/Bookshelf.jsx";
import { BookshelfTabs } from "../components/bookshelf/BookshelfTabs/BookshelfTabs.jsx";

export const Dashboard = () => {
  return (
    <>
      <Header children={[<Searchbox key="searchbox" />, <DropdownMenu key="dropdownMenu" />]} />
      <Main
        width="1000"
        children={[<BookshelfTabs key="bookshelfTabs" />, <Bookshelf key="bookshelf" />]}
      />
    </>
  );
};
