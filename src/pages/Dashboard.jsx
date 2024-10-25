import "./app.scss";
import styles from "./components/Main.module.scss";
import { Header } from "./components/header/Header.jsx";
import { Searchbox } from "./components/header/Searchbox.jsx";
import { DropdownMenu } from "./components/header/DropdownMenu.jsx";
import { Main } from "./components/Main.jsx";
import { Bookshelf } from "./components/bookshelf/Bookshelf.jsx";
import { BookshelfTabs } from "./components/bookshelf/BookshelfTabs.jsx";

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
