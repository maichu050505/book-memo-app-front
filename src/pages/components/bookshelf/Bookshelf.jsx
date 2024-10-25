import styles from "./Book.module.scss";
import { Book } from "./Book.jsx";

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
