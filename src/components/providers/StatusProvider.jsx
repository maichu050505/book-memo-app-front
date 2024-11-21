import { createContext, useState } from "react";

export const StatusContext = createContext({});

export const StatusProvider = ({ children }) => {
  //編集モード切り替え
  const [wantToRead, setWantToRead] = useState(true);
  const [readingNow, setReadingNow] = useState(false);
  const [readed, setReaded] = useState(false);

  return (
    <StatusContext.Provider
      value={{
        wantToRead,
        setWantToRead,
        readingNow,
        setReadingNow,
        readed,
        setReaded,
      }}
    >
      {children}
    </StatusContext.Provider>
  );
};