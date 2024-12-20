import "./app.scss";
import { Header } from "../components/common/Header/Header.jsx";
import { Searchbox } from "../components/common/Searchbox/Searchbox.jsx";
import { DropdownMenu } from "../components/common/DropdownMenu/DropdownMenu.jsx";
import { Main } from "../components/common/Main/Main.jsx";
import { BackButton } from "../components/common/BackButton/BackButton.jsx";
import { BookInfoBox } from "../components/memo/BookInfoBox/BookInfoBox.jsx";
import { Heading } from "../components/common/Heading/Heading.jsx";
import { Tabs } from "../components/memo/Tabs/Tabs.jsx";
import { ReviewProvider } from "../components/providers/ReviewProvider.jsx";
import { MemoProvider } from "../components/providers/MemoProvider.jsx";
import { StatusProvider } from "../components/providers/StatusProvider.jsx";

export const SinglePage = () => {
  return (
    <>
      <Header children={[<Searchbox key="searchbox" />, <DropdownMenu key="dropdownMenu" />]} />
      <Main width="648">
        <BackButton key="backButton" />
        <Heading key="pageTitle" type="h2" children="本の詳細" />
        <BookInfoBox
          key="bookInfoBox"
          buttonLinkTo="/dashboard"
          buttonColor="white_red"
          buttonChildren="本棚から削除"
        />
        
        <StatusProvider>
          <ReviewProvider>
            <MemoProvider>
              <Tabs key="tabs" />
            </MemoProvider>
          </ReviewProvider>
        </StatusProvider>
      </Main>
    </>
  );
};