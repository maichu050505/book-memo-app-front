import React, { createContext, useReducer, useEffect, useRef } from "react";

// メモの初期状態
const initialMemoState = {
  memos: [],
  isEditingMemo: true, // 初期値を追加
};

// Reducer関数
const memoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_MEMO":
      const newMemo = { ...action.payload, isEditing: false }; // サーバーから渡された `id` をそのまま使用
      return { ...state, memos: [...state.memos, newMemo] };
    case "RESET_MEMO":
      return { ...state, memos: [] };
    case "DELETE_MEMO":
      // 指定されたIDのメモを削除
      return { ...state, memos: state.memos.filter((memo) => memo.id !== action.payload) };
    case "TOGGLE_EDIT_MEMO":
      console.log("TOGGLE_EDIT_MEMO triggered:", action.payload);
      return {
        ...state,
        memos: state.memos.map((memo) => {
          const isTarget = memo.id == action.payload.id;
          console.log(`Checking memo: ${memo.id}, isTarget: ${isTarget}`);
          return isTarget ? { ...memo, isEditing: action.payload.isEditing } : { ...memo };
        }),
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
export const MemoProvider = ({ children, bookId }) => {
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
  const toggleEditMemo = (id, isEditing) => {
    console.log(`Setting edit mode for memo with id: ${id} to ${isEditing}`);
    dispatch({ type: "TOGGLE_EDIT_MEMO", payload: { id, isEditing } });
    // 状態が更新された後に確認
    console.log(
      "Updated memos after TOGGLE_EDIT_MEMO:",
      state.memos.map((m) => ({ id: m.id, isEditing: m.isEditing }))
    );
  };

  //編集モードでメモを保存する関数
  const saveMemo = (id, updatedMemo) => {
    dispatch({ type: "SAVE_MEMO", payload: { id, updatedMemo } });
  };

  // 初回レンダリング時にサーバーからメモを取得して初期化
  useEffect(() => {
    const fetchMemos = async () => {
      try {
        const res = await fetch(`http://localhost:3000/memos/${bookId}`);
        if (!res.ok) {
          throw new Error("メモの取得に失敗しました");
        }

        const data = await res.json();
        console.log(`取得したメモ (bookId=${bookId}):`, data);

        // サーバーから取得したメモが配列であることを確認
        if (data.memos && Array.isArray(data.memos)) {
          dispatch({ type: "RESET_MEMO" }); // 状態をリセット

          // 各メモを状態に追加
          data.memos.forEach((memo) => {
            dispatch({
              type: "ADD_MEMO",
              payload: {
                text: memo.memoText,
                image: memo.memoImg,
                id: memo.memoId,
                isEditing: false, // 初期状態は編集モードではない
              },
            });
          });
        }
      } catch (error) {
        console.error("メモ取得エラー:", error);
      }
    };

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
