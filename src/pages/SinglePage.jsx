import "./app.scss";
import { useLocation, useNavigate } from "react-router-dom";
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
  const location = useLocation();
  const navigate = useNavigate();
  // const bookData = location.state; // navigateで渡されたデータ
  const { bookData, query } = location.state || {}; // 検索条件も受け取る
  console.log("SinglePageに渡されたstate:", location.state);
  if (!bookData) {
    return <div>本の情報が見つかりませんでした。</div>;
  }
  const searchQuery = query;

  return (
    <>
      <Header children={[<Searchbox key="searchbox" />, <DropdownMenu key="dropdownMenu" />]} />
      <Main width="648">
        <BackButton key="backButton" to={`/search?query=${encodeURIComponent(searchQuery)}`} />
        <Heading key="pageTitle" type="h2" children="本の詳細" />
        <BookInfoBox
          key="bookInfoBox"
          buttonLinkTo="/dashboard"
          buttonColor="white_red"
          buttonChildren="本棚から削除"
          title={bookData.title}
          author={bookData.author}
          publisher={bookData.publisher}
          publishedDate={bookData.publishedDate}
          coverImageUrl={bookData.coverImageUrl}
          amazonLink={bookData.amazonLink}
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