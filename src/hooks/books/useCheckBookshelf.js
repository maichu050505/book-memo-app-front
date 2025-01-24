import { useEffect, useState } from "react";

//本棚の状態を確認
export const useCheckBookshelf = (id) => {
  const [isInBookshelf, setIsInBookshelf] = useState(false);

  useEffect(() => {
    if (!id) return;

    const checkBookshelf = async () => {
      try {
        const res = await fetch("http://localhost:3000/books/bookshelf");
        if (!res.ok) {
          throw new Error("本棚の状態確認に失敗しました");
        }
        const bookshelf = await res.json();
        const isBookInShelf = bookshelf.some((b) => b.id === id);
        setIsInBookshelf(isBookInShelf);
      } catch (error) {
        console.error("エラー:", error);
      }
    };

    checkBookshelf();
  }, [id]);

  return {
    isInBookshelf,
    setIsInBookshelf,
  };
};
