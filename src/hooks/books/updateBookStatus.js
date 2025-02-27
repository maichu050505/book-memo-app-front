// 読書状況を更新
export async function updateBookStatus(bookId, status) {
  try {
    const response = await fetch(`http://localhost:3000/books/${bookId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }), // 例："WANT_TO_READ", "READING_NOW", "READ"
    });

    if (!response.ok) {
      throw new Error("本のステータス更新に失敗しました");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("updateBookStatus エラー:", error);
    throw error;
  }
}
