import React, { createContext, useReducer } from "react";

// メモの初期状態
const initialMemoState = {
  memos: [],
  isEditingMemo: true, // 初期値を追加
};

// Reducer関数
const memoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_MEMO":
      const newMemo = { ...action.payload, id: Date.now(), isEditing: false };
      return { ...state, memos: [...state.memos, newMemo] };
    case "RESET_MEMO":
      return { ...state, memos: [] };
    case "DELETE_MEMO":
      // 指定されたIDのメモを削除
      return { ...state, memos: state.memos.filter((memo) => memo.id !== action.payload) };
    case "TOGGLE_EDIT_MEMO":
      // 特定のメモの編集モードを切り替える
      return {
        ...state,
        memos: state.memos.map((memo) =>
          memo.id === action.payload ? { ...memo, isEditing: true } : memo
        ),
      };
    case "SAVE_MEMO":
      // 特定のメモの編集モードを切り替える
      return {
        ...state,
        memos: state.memos.map((memo) =>
          memo.id === action.payload.id
            ? {
                ...memo,
                text: action.payload.updatedMemo.text,
                image: action.payload.updatedMemo.image,
                isEditing: false,
              }
            : memo
        ),
      };
    default:
      return state;
  }
};

// Contextの作成
export const MemoContext = createContext();

// Context Providerコンポーネント
export const MemoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(memoReducer, initialMemoState);

  // メモを追加する関数
  const addMemo = (memo) => {
    dispatch({ type: "ADD_MEMO", payload: memo });
  };

  // メモをリセットする関数
  const resetMemo = () => {
    dispatch({ type: "RESET_MEMO" });
  };

  // メモを削除する関数
  const deleteMemo = (id) => {
    dispatch({ type: "DELETE_MEMO", payload: id });
  };

  // 編集モードを切り替える関数
  const toggleEditMemo = (id) => {
    dispatch({ type: "TOGGLE_EDIT_MEMO", payload: id });
  };

  //編集モードでメモを保存する関数
  const saveMemo = (id, updatedMemo) => {
    dispatch({ type: "SAVE_MEMO", payload: { id, updatedMemo } });
  };

  return (
    <MemoContext.Provider
      value={{
        memos: state.memos,
        addMemo,
        resetMemo,
        deleteMemo,
        toggleEditMemo,
        saveMemo,
      }}
    >
      {children}
    </MemoContext.Provider>
  );
};
