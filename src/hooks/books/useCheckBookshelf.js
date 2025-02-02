import { useEffect, useState, useRef } from "react";

export const useCheckBookshelf = (id) => {
  const [isInBookshelf, setIsInBookshelf] = useState(false);
  const prevIdRef = useRef(null); // 前回の id を保存

  useEffect(() => {
    if (!id || prevIdRef.current === id) return; // id が同じなら処理をスキップ

    prevIdRef.current = id; // 現在の id を保存

    const checkBookshelf = async () => {
      try {
        console.log("本棚の状態確認リクエストを送信");
        const res = await fetch("http://localhost:3000/books/bookshelf", {
          method: "GET",
        });
        if (!res.ok) {
          const errorData = await res.json();
          console.error("サーバーエラー:", errorData.error || "不明なエラー");
          throw new Error(errorData.error || "本棚の状態確認に失敗しました");
        }
        const bookshelf = await res.json();
        console.log("取得した本棚データ:", bookshelf);

        const isBookInShelf = bookshelf.some((b) => b.bookId === id);
        setIsInBookshelf(isBookInShelf);
      } catch (error) {
        console.error("エラー:", error.message);
      }
    };

    checkBookshelf();
  }, [id]);

  return {
    isInBookshelf,
    setIsInBookshelf,
  };
};
