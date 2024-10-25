import { useState } from "react";
import "./app.css";
import styles from "./components/Main.module.scss";
import { Header } from "./components/header/Header.jsx";
import { Main } from "./components/Main.jsx";
import { BackButton } from "./components/BackButton.jsx";
import { PageTitle } from "./components/PageTitle.jsx";
import { BookInfoBox } from "./components/BookInfoBox.jsx";
import { SubmitButton } from "./components/form/SubmitButton.jsx";
import { EditReview } from "./components/EditReview.jsx";
import { EditMemo } from "./components/EditMemo.jsx";
import { AddPhoto } from "./components/AddPhoto.jsx";
import { AddMemo } from "./components/AddMemo.jsx";
import { H3 } from "./components/H3.jsx";
import { Pulldown } from "./components/Pulldown.jsx";

export const EditPage = () => {
  const [textareas, setTextareas] = useState([]); //複数のtextareaを管理
  const AddTextarea = () => {
    setTextareas([...textareas, ""]); // 新しいtextareaを追加
  };
  return (
    <>
      <Header />
      <Main width="648">
        <BackButton key="backButton" />
        <PageTitle key="pageTitle" children="本棚に登録" />
        <BookInfoBox
          key="bookInfoBox"
          buttonLinkTo="/dashboard"
          buttonColor="white_red"
          buttonChildren="本棚から削除"
        />
        <H3 key="h3_review" children="評価と感想" />
        <EditReview key="editReview" />
        <H3 key="h3_memo">
          読書メモ<span>※あなたにしか見えません</span>
        </H3>
        <EditMemo key="editMemo" />
        <AddPhoto key="addPhoto" />
        {textareas.map((_, index) => (
          <textarea key={index} className={styles.editMemo} rows="7" name="" id=""></textarea>
        ))}
        <AddMemo key="addMemo" onAddTextarea={AddTextarea} />
        <H3 key="h3_status" children="読書状況" />
        <Pulldown key="status" />
        <SubmitButton key="save" children="保存する" />
      </Main>
    </>
  );
};
