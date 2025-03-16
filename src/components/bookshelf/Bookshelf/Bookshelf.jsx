import React, { useContext, useMemo } from "react";
import styles from "./Bookshelf.module.scss";
import { Book } from "../Book/Book.jsx";
import { AuthContext } from "../../providers/AuthProvider";
import { useUserBooks } from "../../../hooks/books/useUserBooks";
import { useAllBooks } from "../../../hooks/books/useAllBooks";

export const BookshelfComponent = ({ filter = "all" }) => {
  const { user } = useContext(AuthContext);

  // ユーザーがログインしている場合は useUserBooks、ログアウト状態なら useAllBooks を使用
  const { books, loading, error } = user ? useUserBooks(user.id, filter) : useAllBooks();

  console.log("Bookshelf: books =", books); // デバッグ

  // books のリストをメモ化
  const renderedBooks = useMemo(() => {
    if (books.length === 0) return <li>本が登録されていません</li>;
    return books.map((book) => (
      <li key={book.id}>
        <Book book={book} />
      </li>
    ));
  }, [books]);

  if (loading) return <div>読み込み中…</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return <ul className={styles.bookshelf}>{renderedBooks}</ul>;
};

// コンポーネント全体を React.memo でメモ化する
export const Bookshelf = React.memo(BookshelfComponent);
