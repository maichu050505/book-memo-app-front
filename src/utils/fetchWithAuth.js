// fetch をラップして、リクエスト時に Authorization ヘッダーを自動付与し、レスポンスが 401（Unauthorized）の場合にグローバルにエラーハンドリングする。
// セッション切れが発生したときには「セッションの有効期限が切れました。再度ログインしてください。」というエラーだけを表示し、その後の他のエラー（たとえばネットワークエラーやその他の API エラー）については、セッション切れのエラーが解決されるまでユーザーに通知しないようにする。

// グローバルなセッション切れフラグ
let sessionExpired = false;

// セッション切れフラグ（sessionExpired）のリセット用の関数をエクスポート
export function resetSessionExpired() {
  sessionExpired = false;
}

export async function fetchWithAuth(url, options = {}) {
  // localStorage からトークンを取得
  const token = localStorage.getItem("token");

  // ヘッダーを設定
  const headers = options.headers ? { ...options.headers } : {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  headers["Content-Type"] = headers["Content-Type"] || "application/json";
  options.headers = headers;

  // リクエストを実行
  const response = await fetch(url, options);

  // 401 Unauthorized の場合のグローバルエラーハンドリング
  if (response.status === 401) {
    // セッション切れの場合、フラグをセットしてアラートを表示
    if (!sessionExpired) {
      sessionExpired = true;
      // アラートを表示してログインページへリダイレクトする
      alert("セッションの有効期限が切れました。再度ログインしてください。");
      // ここでは window.location を利用していますが、React Router を使っている場合は、
      // 共通のナビゲーションハンドラを使う方法もあります
      window.location.href = "/login";
    }
    // 401 エラーの場合は以降のエラーメッセージを抑制
    throw new Error("Unauthorized");
  }

  return response;
}
