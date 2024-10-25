import { Link } from "react-router-dom";
import "./app.css";
import styles from "./components/SinglePage.module.scss";
import { Header } from "./components/header/Header.jsx";
import { Main } from "./components/Main.jsx";
import { BackButton } from "./components/BackButton.jsx";
import { PageTitle } from "./components/PageTitle.jsx";
import { BookInfoBox } from "./components/BookInfoBox.jsx";
import { SubmitButton } from "./components/form/SubmitButton.jsx";
import { ReviewBox } from "./components/ReviewBox.jsx";
import { MemoBox } from "./components/MemoBox.jsx";
import { AddPhoto } from "./components/AddPhoto.jsx";
import { AddMemo } from "./components/AddMemo.jsx";
import { H3 } from "./components/H3.jsx";
import { Status } from "./components/Status.jsx";
import { Tabs } from "./components/Tabs.jsx";

export const SinglePage = () => {
  return (
    <>
      <Header />
      <Main width="648">
        <BackButton key="backButton" />
        <PageTitle key="pageTitle" children="本の詳細" />
        <BookInfoBox
          key="bookInfoBox"
          buttonLinkTo="/dashboard"
          buttonColor="white_red"
          buttonChildren="本棚から削除"
        />
        <Tabs key="tabs" />
        <div className={`${styles.myMemo} ${styles.active}`}>
          <H3 key="h3_review" children="評価と感想" />
          <ReviewBox key="reviewBox" />
          <H3 key="h3_memo">
            読書メモ<span>※あなたにしか見えません</span>
          </H3>
          <MemoBox key="memoBox" />
          <H3 key="h3_status" children="読書状況" />
          <Status key="status" />
        </div>
        <div className={styles.others}>
          <H3 key="h3_review" children="評価と感想" />
          <ReviewBox key="reviewBox" />
        </div>
        <Link to="/edit" key="edit" children="編集する" className="linkButton blue middle center" />
      </Main>
    </>
  );
};
