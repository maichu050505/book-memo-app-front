import { getUrl } from "./urls.jsx";

// p は "https://..." または "/uploads/xxx.jpg" または "uploads/xxx.jpg"
export function toImageSrc(p) {
  if (!p) return "";
  // 絶対URLはそのまま
  if (/^https?:\/\//i.test(p)) return p;
  // 相対はバックエンドのベースURLを前置
  const path = p.startsWith("/") ? p : `/${p}`;
  return getUrl(path);
}
