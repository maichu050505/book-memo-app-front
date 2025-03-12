import React, { useContext } from "react";
import styles from "./Bookshelf.module.scss";
import { Book } from "../Book/Book.jsx";
import { AuthContext } from "../../providers/AuthProvider";
import { useUserBooks } from "../../../hooks/books/useUserBooks";
import { useAllBooks } from "../../../hooks/books/useAllBooks";

export const Bookshelf = ({ filter = "all" }) => {
  const { user } = useContext(AuthContext);

  // ユーザーがログインしている場合は useUserBooks、ログアウト状態なら useAllBooks を使用
  const { books, loading, error } = user ? useUserBooks(user.id, filter) : useAllBooks();

  console.log("Bookshelf: books =", books); // デバッグ

  if (loading) return <div>読み込み中…</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <ul className={styles.bookshelf}>
      {books.length === 0 ? (
        <li>本が登録されていません</li>
      ) : (
        books.map((book) => (
          <li key={book.id}>
            <Book book={book} />
          </li>
        ))
      )}
    </ul>
  );
};
