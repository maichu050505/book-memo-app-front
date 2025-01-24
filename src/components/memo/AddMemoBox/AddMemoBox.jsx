import { useRef, useState, useContext, useEffect } from "react";
import { MemoContext } from "../../providers/MemoProvider.jsx"
import styles from "./AddMemoBox.module.scss";
import { SubmitButton } from "../../../components/common/SubmitButton.jsx";

export const AddMemoBox = ({ type, memo } ) => {
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);
  // const [localMemoText, setLocalMemoText] = useState("");
  // const [localMemoImages, setLocalMemoImages] = useState([]);
  // const { addMemo, saveMemo, bookId } = useContext(MemoContext);
  const [localMemoText, setLocalMemoText] = useState(memo?.text || "");
  const [localMemoImages, setLocalMemoImages] = useState(memo?.image || []);
  const { addMemo, saveMemo, toggleEditMemo, bookId } = useContext(MemoContext);

  // アイコンをクリックした時にファイル選択を開く関数
  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  // ファイルが選択された時の処理
  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file)); // 選択されたファイルを配列に変換
      setLocalMemoImages((prevImages) => [...prevImages, ...newImages]); // 新しい画像を追加
    }
  };

  // 画像を削除する関数
  const handleRemoveImage = (index) => {
    setLocalMemoImages((prevImages) => prevImages.filter((_, i) => i !== index));
    fileInputRef.current.value = null; // ファイル入力をリセット
  };

  // テキストエリアの高さを自動調整する関数
  const handleInput = (event) => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    setLocalMemoText(event.target.value);
  };

  // メモを保存する処理 (新規追加 or 編集保存)
  const handleSaveMemo = async () => {
    try {
      // 新規作成の場合は一意のIDを生成、編集時は既存のIDを使用
      const memoData = {
        memoText: localMemoText,
        memoImg: localMemoImages,
        memoId: memo?.id || Date.now(), // 新規作成時は新しいIDを生成、編集時は既存のIDを使用。memo?.idは、memoというオブジェクトがあればmemoのidを返す、なければundefinedを返すという意味。
      };

      console.log("保存するメモ:", memoData);

      const url = `http://localhost:3000/books/memos/${bookId}`;
      const method = memo?.id ? "PUT" : "POST"; // 編集か新規作成かを判定。

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(memoData), // リクエストボディに memoId を含む
      });

      if (!res.ok) {
        throw new Error("メモの保存に失敗しました");
      }

      const updatedMemo = await res.json();
      console.log("サーバーからの応答:", updatedMemo);

      if (!memo?.id) {
        // 新しいメモを追加
        addMemo({
          text: localMemoText,
          image: localMemoImages,
          id: updatedMemo.memo.memoId, // サーバーが返したIDを使用
        });
      } else {
        // 既存メモを更新
        saveMemo(memo.id, {
          text: localMemoText,
          image: localMemoImages,
        });
      }

      // フォームのリセット
      setLocalMemoText("");
      setLocalMemoImages([]);
      if (fileInputRef.current) fileInputRef.current.value = null;

      // 編集モード終了
      if (memo?.id) {
        console.log(`Ending edit mode for memo with id: ${memo.id}`);
        toggleEditMemo(memo.id, false);
      } // 編集モード終了
      // alert("メモが保存されました！");
    } catch (error) {
      console.error("メモ保存エラー:", error);
      alert("メモの保存に失敗しました。もう一度お試しください。");
    }
  };

  // // メモを追加する処理
  // const handleAddMemo = async (memoText, memoImage, id) => {
  //   try {
  //     // 保存するデータを準備
  //     const memoData = {
  //       memoText: memoText,
  //       memoImg: memoImage.length > 0 ? memoImage : [], // 画像がない場合は空配列
  //       memoId: id,
  //     };
  //     console.log("保存前のデータ:", { bookId, ...memoData });

  //     // サーバーにリクエスト
  //     const url = `http://localhost:3000/books/memos/${bookId}`;
  //     const method = "POST";

  //     const res = await fetch(url, {
  //       method,
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(memoData),
  //     });

  //     if (!res.ok) {
  //       throw new Error("メモの保存に失敗しました");
  //     }

  //     const result = await res.json();
  //     console.log("サーバーからの応答:", result);

  //     // コンテキストに新しいメモを追加
  //     addMemo({
  //       text: memoText,
  //       image: memoImage,
  //     });
  //     setLocalMemoText(""); // テキストエリアをリセット
  //     setLocalMemoImages([]); // 画像をリセット
  //     if (fileInputRef.current) {
  //       fileInputRef.current.value = null; // ファイル入力をリセット
  //     }
  //   } catch (error) {
  //     console.error("メモ保存エラー:", error);
  //     alert("メモの保存に失敗しました。もう一度お試しください。");
  //   }
  // };

  // 初期化時にmemoの内容をセットする
  useEffect(() => {
    if (memo) {
      setLocalMemoText(memo.text);
      setLocalMemoImages(memo.image || []);
    }
  }, [memo]);

  return (
    <>
      <div className={styles.addMemoBoxContainer}>
        <textarea
          ref={textareaRef}
          className={styles.addMemoBox}
          placeholder="メモを入力してください"
          onChange={handleInput}
          value={localMemoText}
        />
        {/* 画像プレビューと削除ボタン */}
        {/* 画像プレビューと削除ボタン */}
        {localMemoImages.length > 0 && (
          <div className={styles.imagePreviewContainer}>
            {localMemoImages.map((image, index) => (
              <div key={index} className={styles.imagePreview}>
                <img src={image} alt="Selected" />
                <img
                  src="./img/icon_delete2.svg"
                  className={styles.removeButton}
                  onClick={() => handleRemoveImage(index)}
                />
              </div>
            ))}
          </div>
        )}
        <img
          src="./img/icon_img.svg"
          alt="写真を追加"
          className={styles.iconButton}
          onClick={handleIconClick}
        />
        {/* ファイル入力 */}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="image/*"
          multiple // 複数ファイル選択可能
          onChange={handleFileChange}
        />
      </div>
      {/* <SubmitButton
        key="submitButtonMemo"
        children={type === "add" ? "メモを追加する" : "保存する"}
        className="mt10 mb60"
        onClick={
          type === "add"
            ? () => handleAddMemo(localMemoText, localMemoImages)
            : () => saveMemo(memo.id, { text: localMemoText, image: localMemoImages })
        }
      /> */}
      <SubmitButton
        key="submitButtonMemo"
        children={type === "add" ? "メモを追加する" : "保存する"}
        className="mt10 mb60"
        onClick={handleSaveMemo}
      />
    </>
  );
};
