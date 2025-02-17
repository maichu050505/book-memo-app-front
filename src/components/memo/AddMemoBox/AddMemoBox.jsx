import { useRef, useState, useContext, useEffect } from "react";
import { MemoContext } from "../../providers/MemoProvider.jsx";
import styles from "./AddMemoBox.module.scss";
import { SubmitButton } from "../../../components/common/SubmitButton.jsx";

export const AddMemoBox = ({ type, memo }) => {
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);
  const [localMemoText, setLocalMemoText] = useState(memo?.text || "");
  const [localMemoImages, setLocalMemoImages] = useState(
    memo?.image && memo.image.length > 0 ? memo.image : []
  );
  const { addMemo, saveMemo, toggleEditMemo, bookId } = useContext(MemoContext);
  const [deletedImages, setDeletedImages] = useState([]); // 削除された画像を記録

  // アイコンをクリックした時にファイル選択を開く関数
  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  // ファイルが選択された時の処理 一時的なプレビュー用
  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
      setLocalMemoImages((prevImages) => [...prevImages, ...newImages]); // 新しい画像を追加
    }
  };

  // 画像を削除する関数
  const handleRemoveImage = (index) => {
    const removedImage = localMemoImages[index];

    setLocalMemoImages((prevImages) => prevImages.filter((_, i) => i !== index));

    // **新しく追加した画像なら削除リストに入れない**
    if (removedImage.startsWith("/uploads")) {
      setDeletedImages((prev) => [...prev, removedImage]);
    }
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
      const formData = new FormData();
      formData.append("memoText", localMemoText);
      formData.append("bookId", bookId);

      // **新しい画像を追加**
      if (fileInputRef.current && fileInputRef.current.files.length > 0) {
        Array.from(fileInputRef.current.files).forEach((file) => {
          formData.append("memoImg", file);
        });
      }

      const isEditing = memo?.id !== undefined;
      const url = isEditing
        ? `http://localhost:3000/memos/${memo.id}`
        : `http://localhost:3000/memos/${bookId}`;
      const method = isEditing ? "PUT" : "POST";

      // **削除した画像を送信**
      if (isEditing && deletedImages.length > 0) {
        deletedImages.forEach((img) => {
          formData.append("deletedImages", img);
        });
      }

      const res = await fetch(url, {
        method,
        body: formData,
      });

      if (!res.ok) {
        throw new Error("メモの保存に失敗しました");
      }

      const updatedMemo = await res.json();
      console.log("保存されたメモ:", updatedMemo);

      // **ローカルの状態を更新**
      if (!isEditing) {
        addMemo({
          id: updatedMemo.memo.id,
          text: updatedMemo.memo.memoText,
          image: updatedMemo.memo.memoImg ? updatedMemo.memo.memoImg.split("||") : [],
        });
      } else {
        saveMemo(updatedMemo.memo.id, {
          text: updatedMemo.memo.memoText,
          image: updatedMemo.memo.memoImg ? updatedMemo.memo.memoImg.split("||") : [],
        });
      }

      // **保存後に入力欄をリセット**
      setLocalMemoText("");
      setLocalMemoImages([]);
      setDeletedImages([]); // **削除リストをリセット**
      if (fileInputRef.current) fileInputRef.current.value = null;

      toggleEditMemo(updatedMemo.memo.id, false);
    } catch (error) {
      console.error("メモ保存エラー:", error);
      alert("メモの保存に失敗しました。");
    }
  };

  // 初期化時にmemoの内容をセットする
  useEffect(() => {
    if (memo && memo.image && memo.image.length > 0) {
      setLocalMemoImages(memo.image); // `memo.image` が `undefined` の場合は処理しない
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
        {localMemoImages.length > 0 && (
          <div className={styles.imagePreviewContainer}>
            {localMemoImages.map((image, index) => {
              const imageUrl = image.startsWith("/uploads")
                ? `http://localhost:3000${image}`
                : image;
              console.log(`プレビュー画像 URL: ${imageUrl}`);

              return (
                <div key={index} className={styles.imagePreview}>
                  <img src={imageUrl} alt={`メモ画像 ${index + 1}`} />
                  <img
                    src="./img/icon_delete2.svg"
                    className={styles.removeButton}
                    onClick={() => handleRemoveImage(index)}
                  />
                </div>
              );
            })}
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
