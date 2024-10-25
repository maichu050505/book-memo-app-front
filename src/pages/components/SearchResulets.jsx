import styles from "./SearchResults.module.scss";
import { BookInfoBox } from "./BookInfoBox";

export const SearchResults = () => {
  return (
    <div className={styles.searchResults}>
      <ul className={styles.list}>
        <li>
          <BookInfoBox buttonLinkTo="/edit" buttonColor="blue" buttonChildren="本棚に登録" />
        </li>
        <li>
          <BookInfoBox buttonLinkTo="/edit" buttonColor="blue" buttonChildren="本棚に登録" />
        </li>
        <li>
          <BookInfoBox buttonLinkTo="/edit" buttonColor="blue" buttonChildren="本棚に登録" />
        </li>
        <li>
          <BookInfoBox buttonLinkTo="/edit" buttonColor="blue" buttonChildren="本棚に登録" />
        </li>
        <li>
          <BookInfoBox buttonLinkTo="/edit" buttonColor="blue" buttonChildren="本棚に登録" />
        </li>
        <li>
          <BookInfoBox buttonLinkTo="/edit" buttonColor="blue" buttonChildren="本棚に登録" />
        </li>
        <li>
          <BookInfoBox buttonLinkTo="/edit" buttonColor="blue" buttonChildren="本棚に登録" />
        </li>
      </ul>
    </div>
  );
};
