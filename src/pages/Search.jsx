import "./app.scss";
import { Header } from "../components/common/Header/Header.jsx";
import { Main } from "../components/common/Main/Main.jsx";
import { BackButton } from "../components/common/BackButton/BackButton.jsx";
import { Heading } from "../components/common/Heading/Heading.jsx";
import { Searchbox } from "../components/common/Searchbox/Searchbox.jsx";
import { DropdownMenu } from "../components/common/DropdownMenu/DropdownMenu.jsx";
import { BookInfoBox } from "../components/memo/BookInfoBox/BookInfoBox.jsx";

export const Search  = () => {
  return (
    <>
      <Header children={[<Searchbox key="searchbox" />, <DropdownMenu key="dropdownMenu" />]} />
      <Main width="648">
        <BackButton key="backButton" />
        <Heading key="pageTitle" type="h2" children="検索結果" />
        <Heading key="h3_searchResult" type="h3" children="一覧" />
        <div className="searchResults">
          <ul className="list">
            <li>
              <BookInfoBox buttonLinkTo="/single" buttonColor="blue" buttonChildren="本棚に登録" />
            </li>
            <li>
              <BookInfoBox buttonLinkTo="/single" buttonColor="blue" buttonChildren="本棚に登録" />
            </li>
            <li>
              <BookInfoBox buttonLinkTo="/single" buttonColor="blue" buttonChildren="本棚に登録" />
            </li>
            <li>
              <BookInfoBox buttonLinkTo="/single" buttonColor="blue" buttonChildren="本棚に登録" />
            </li>
            <li>
              <BookInfoBox buttonLinkTo="/single" buttonColor="blue" buttonChildren="本棚に登録" />
            </li>
            <li>
              <BookInfoBox buttonLinkTo="/single" buttonColor="blue" buttonChildren="本棚に登録" />
            </li>
            <li>
              <BookInfoBox buttonLinkTo="/single" buttonColor="blue" buttonChildren="本棚に登録" />
            </li>
          </ul>
        </div>
      </Main>
    </>
  );
};
