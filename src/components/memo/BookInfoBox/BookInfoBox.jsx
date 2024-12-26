import { Link, useNavigate } from "react-router-dom";
import styles from "./BookInfoBox.module.scss";
import { BookInfoButton } from "../BookInfoButton/BookInfoButton.jsx";

export const BookInfoBox = ({
  buttonLinkTo,
  buttonColor,
  buttonChildren,
  title,
  author,
  publisher,
  publishedDate,
  coverImageUrl,
  amazonLink,
  query
}) => {
  const navigate = useNavigate();

  const addToBookshelf = async () => {
    try {
      console.log("本棚に登録するために送信するデータ:", { title }); // リクエスト送信前に確認
      const res = await fetch(`http://localhost:3000/books/bookshelf`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      if (!res.ok) {
        console.error("本の情報取得に失敗しました");
        return;
      }

      const data = await res.json();
      const bookData = data.results?.[0];

      if (!bookData) {
        console.error("該当する本が見つかりませんでした");
        return;
      }

      // navigateでbookDataをstateとして渡す
      console.log("渡すbookData:", bookData); // ここでbookDataを確認
      navigate(buttonLinkTo, {
        state: { bookData, query },
      });
    } catch (error) {
      console.error("エラーが発生しました: ", error);
    }
  };


  const getBookInfo = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/books/getBookInfo?title=${encodeURIComponent(title)}`
      );
      if (!res.ok) {
        console.error("本の情報取得に失敗しました");
        return;
      }
      const data = await res.json(); // レスポンス全体を取得
      const bookData = data.results?.[0]; // 配列の最初の要素を取得
      if (!bookData) {
        console.error("該当する本が見つかりませんでした");
        return;
      }

      // navigate で state を渡して遷移
      navigate(buttonLinkTo, {
        state: { bookData, query: query }, // 渡された searchTerm を使う
      });
    } catch (error) {
      console.error("エラーが発生しました: ", error);
    }
  }
  return (
    <div className={styles.bookInfoBox}>
      <div className={styles.cover}>
        <img src={coverImageUrl} alt={title} />
      </div>
      <div className={styles.info}>
        <Link to="/single" className={styles.bookTitle} onClick={getBookInfo}>
          {title}
        </Link>
        <div className={styles.numbers}>
          <p className={styles.registrants}>
            <img src="./img/icon_registrant.svg" alt="" />
            88
          </p>
          <p className={styles.stars}>★4.27</p>
          <p className={styles.reviewers}>
            <img src="./img/icon_review-blue.svg" alt="レビューを書いた人数" />1
          </p>
        </div>
        <p className={styles.subInfo}>
          {author} / {publisher} / {publishedDate}
        </p>
      </div>
      <div>
        <BookInfoButton
          linkTo={buttonLinkTo}
          buttonColor={buttonColor}
          children={buttonChildren}
          onClick={addToBookshelf}
        />
        <BookInfoButton linkTo={amazonLink} buttonColor="gray" children="Amazon" />
      </div>
    </div>
  );
};
