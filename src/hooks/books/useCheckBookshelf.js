// 指定した bookId と userId を元に、本棚（GET /users/:userId/bookshelf?filter=all）から対象の本が存在するかをブール値で返すフック。
import { useEffect, useState, useRef } from "react";
import { getUrl } from "../../utils/urls";

export const useCheckBookshelf = (bookId, userId) => {
  const [isInBookshelf, setIsInBookshelf] = useState(false);
  const prevBookIdRef = useRef(null); // 前回の id を保存

  useEffect(() => {
    if (!bookId || !userId) return; // bookId と userId がない場合はスキップ

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("認証トークンがありません");
      return;
    }

    if (prevBookIdRef.current === bookId) return; // 前回と同じ bookId ならスキップ
    prevBookIdRef.current = bookId; // 現在の bookId を保存

    const checkBookshelf = async () => {
      try {
        console.log(`本棚の状態を確認中: userId=${userId}, bookId=${bookId}`);
        // クエリパラメーターに userId と filter (ここは "all" など固定でOK) を渡す
        const res = await fetch(getUrl(`/users/${userId}/bookshelf?filter=all`), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          const errorData = await res.json();
          console.error("サーバーエラー:", errorData.error || "不明なエラー");
          throw new Error(errorData.error || "本棚の状態確認に失敗しました");
        }
        const bookshelf = await res.json();
        if (!Array.isArray(bookshelf)) {
          console.error("本棚データの形式が不正です:", bookshelf);
          return;
        }
        console.log("取得した本棚データ:", bookshelf);

        // バックエンドでは、bookshelf を Book オブジェクトの配列として返しているはず
        // そのため、bookId が一致するかチェックする
        const isBookInShelf = bookshelf.some((book) => book.id === Number(bookId));
        setIsInBookshelf(isBookInShelf);
      } catch (error) {
        console.error("エラー:", error.message);
      }
    };

    checkBookshelf();
  }, [bookId, userId]);

  return {
    isInBookshelf,
    setIsInBookshelf,
  };
};
