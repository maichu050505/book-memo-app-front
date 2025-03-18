import React, { createContext, useReducer, useEffect, useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { getUrl } from "../../utils/urls";

// メモの初期状態
const initialMemoState = {
  memos: [],
};

// Reducer関数
const memoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_MEMO":
      return { ...state, memos: [...state.memos, { ...action.payload, isEditing: false }] };

    case "RESET_MEMO":
      return { ...state, memos: [] };

    case "DELETE_MEMO":
      console.log("Deleting memo with id:", action.payload);
      return {
        ...state,
        memos: state.memos.filter((memo) => memo.id !== Number(action.payload)), // 型を統一
      };

    case "TOGGLE_EDIT_MEMO":
      return {
        ...state,
        memos: state.memos.map((memo) =>
          memo.id === action.payload.id ? { ...memo, isEditing: action.payload.isEditing } : memo
        ),
      };

    case "SAVE_MEMO":
      return {
        ...state,
        memos: state.memos.map((memo) =>
          memo.id === action.payload.id
            ? {
                ...memo,
                text: action.payload.updatedMemo.text,
                image: action.payload.updatedMemo.image || [],
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
export const MemoProvider = ({ children, bookId }) => {
  const { user } = useContext(AuthContext);
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
    dispatch({ type: "DELETE_MEMO", payload: Number(id) }); // idをNumber型に統一
  };

  // 編集モードを切り替える関数
  const toggleEditMemo = (id, isEditing) => {
    console.log(`編集モード変更: id=${id}, isEditing=${isEditing}`);
    dispatch({ type: "TOGGLE_EDIT_MEMO", payload: { id: Number(id), isEditing } });
  };

  // 編集モードでメモを保存する関数
  const saveMemo = (id, updatedMemo) => {
    dispatch({ type: "SAVE_MEMO", payload: { id, updatedMemo } });
  };

  // メモ取得関数
  const fetchMemos = async () => {
    try {
      if (!user || !bookId) return;
      const token = localStorage.getItem("token");
      const res = await fetch(getUrl(`/users/${user.id}/bookshelf/${bookId}/memos`), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error(`メモの取得に失敗しました (HTTP ${res.status})`);
      }

      const data = await res.json();
      console.log("取得したメモ:", data);

      if (data.memos && Array.isArray(data.memos)) {
        dispatch({ type: "RESET_MEMO" });

        data.memos.forEach((memo) => {
          const images =
            memo.memoImg && memo.memoImg.trim() !== ""
              ? memo.memoImg
                  .split("||")
                  .map((img) => img.trim())
                  .filter(Boolean)
              : []; // 画像が || で区切られている場合、配列として処理。

          dispatch({
            type: "ADD_MEMO",
            payload: {
              text: memo.memoText,
              image: images, // `image` に配列をセット
              id: memo.id,
              isEditing: false,
            },
          });
        });
      }
    } catch (error) {
      console.error("メモ取得エラー:", error);
    }
  };

  // `useEffect` でメモを取得
  useEffect(() => {
    if (bookId) {
      fetchMemos();
    }
  }, [bookId]);

  return (
    <MemoContext.Provider
      value={{
        memos: state.memos,
        addMemo,
        resetMemo,
        deleteMemo,
        toggleEditMemo,
        saveMemo,
        bookId,
      }}
    >
      {children}
    </MemoContext.Provider>
  );
};
