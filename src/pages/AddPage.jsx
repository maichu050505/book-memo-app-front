import "./app.css";
import styles from "./components/Main.module.scss";
import { Header } from "./components/header/Header.jsx";
import { Main } from "./components/Main.jsx";
import { BackButton } from "./components/BackButton.jsx";
import { PageTitle } from "./components/PageTitle.jsx";
import { Form } from "./components/form/Form.jsx";
import { Input } from "./components/form/Input.jsx";
import { SearchResults } from "./components/SearchResulets.jsx";
import { H3 } from "./components/H3.jsx";

export const AddPage = () => {
  return (
    <>
      <Header />
      <Main
        width="648"
        children={[
          <BackButton key="backButton" />,
          <PageTitle key="pageTitle" children="本棚に登録" />,
          <H3 key="h3_search" children="検索" />,
          <Input key="search" label="検索" type="text" className="styles.search" />,
          <H3 key="h3_searchResult" children="一覧" />,
          <SearchResults key="searchResult" />,
        ]}
      />
    </>
  );
};
