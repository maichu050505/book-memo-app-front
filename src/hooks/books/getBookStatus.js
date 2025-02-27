// 読書状況を取得
export async function getBookStatus(bookId) {
  try {
    const response = await fetch(`http://localhost:3000/books/${bookId}/status`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("ステータス取得に失敗しました");
    }
    return await response.json();
  } catch (error) {
    console.error("getBookStatus エラー:", error);
    throw error;
  }
}
