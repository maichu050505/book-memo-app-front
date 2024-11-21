import styles from "./Bookshelf.module.scss";
import { Book } from "../Book/Book.jsx";

export const Bookshelf = () => {
  return (
    <ul className={styles.bookshelf}>
      <li>
        <Book />
      </li>
      <li>
        <Book />
      </li>
      <li>
        <Book />
      </li>
      <li>
        <Book />
      </li>
      <li>
        <Book />
      </li>
      <li>
        <Book />
      </li>
    </ul>
  );
};
