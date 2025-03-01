// 自作のJWT デコード関数　JWT のペイロード部分を Base64URL でデコードし JSON に変換する
export function jwtDecode(token) {
  try {
    const payload = token.split(".")[1];
    // Base64URL → Base64 変換
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    // atob() でデコードして JSON に変換
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("JWT デコードエラー:", error);
    return null;
  }
}
