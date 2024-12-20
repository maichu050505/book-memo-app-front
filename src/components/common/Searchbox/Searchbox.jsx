import { useSearchParams, useNavigate } from "react-router-dom";
import styles from "./Searchbox.module.scss";

export const Searchbox = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const searchInput = e.target.elements.search.value.trim();
    if (searchInput) {
      console.log(`Setting search query: ${searchInput}`);
      setSearchParams({ query: searchInput }); // クエリパラメータを更新
      navigate(`/search?query=${encodeURIComponent(searchInput)}`); // /search に遷移
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="search"
        className={styles.header_search}
        placeholder="作品・著者名で検索"
      />
      <button type="submit" className={styles.header_search_submit}>
        <img src="/img/icon_search.svg" />
      </button>
    </form>
  );
};
