import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "../../utils/jwtDecode";

export const AuthContext = createContext({ user: null, setUser: () => {} });

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // コンポーネントのマウント時にトークンからユーザー情報をセット
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.error("トークンのデコードに失敗しました", error);
      }
    }
  }, []);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};
