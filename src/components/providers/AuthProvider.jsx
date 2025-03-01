import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "../../utils/jwtDecode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded) {
        setUser(decoded);
      } else {
        console.error("トークンのデコードに失敗しました");
      }
    }
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};
