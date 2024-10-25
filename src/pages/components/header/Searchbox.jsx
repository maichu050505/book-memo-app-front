import styles from "./Header.module.scss";

export const Searchbox = () => {
  return (
    <form>
      <input type="text" className={styles.header_search} placeholder="作品・著者名で検索" />
      <button type="submit" className={styles.header_search_submit}>
        <img src="/img/icon_search.svg" />
      </button>
    </form>
  );
};
