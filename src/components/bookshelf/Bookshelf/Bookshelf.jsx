import React, { useContext } from "react";
import styles from "./Bookshelf.module.scss";
import { Book } from "../Book/Book.jsx";
import { AuthContext } from "../../providers/AuthProvider";
import { useUserBooks } from "../../../hooks/books/useUserBooks";

export const Bookshelf = ({ filter = "all" }) => {
  const { user } = useContext(AuthContext);
  const { books, loading, error } = useUserBooks(user ? user.id : null, filter);

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
