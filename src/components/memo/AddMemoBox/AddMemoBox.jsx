import { useRef, useState, useContext, useEffect } from "react";
import { MemoContext } from "../../providers/MemoProvider.jsx"
import styles from "./AddMemoBox.module.scss";
import { SubmitButton } from "../../../components/common/SubmitButton.jsx";

export const AddMemoBox = ({ type, memo } ) => {
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);
  const [localMemoText, setLocalMemoText] = useState("");
  const [localMemoImages, setLocalMemoImages] = useState([]);
  const { addMemo, saveMemo } = useContext(MemoContext);

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

  // メモを追加する処理
  const handleAddMemo = (memoText, memoImage) => {
    const newMemo = {
      text: memoText,
      image: memoImage,
    };
    addMemo(newMemo);
    setLocalMemoText(""); // テキストエリアをリセット
    setLocalMemoImages([]); // 画像をリセット
    if (fileInputRef.current) {
      fileInputRef.current.value = null; // ファイル入力をリセット
    }
  };

  // 初期化時にmemoの内容をセットする
  useEffect(() => {
    if (memo) {
      setLocalMemoText(memo.text);
      setLocalMemoImages(memo.image || []);
    }
  }, [memo]);

  // 保存処理
  const handleSaveMemo = (memoText, memoImage) => {
    saveMemo(memo.id, { text: memoText, image: memoImage });
  };

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
      <SubmitButton
        key="submitButtonMemo"
        children={type === "add" ? "メモを追加する" : "保存する"}
        className="mt10 mb60"
        onClick={
          type === "add"
            ? () => handleAddMemo(localMemoText, localMemoImages)
            : () => saveMemo(memo.id, { text: localMemoText, image: localMemoImages })
        }
      />
    </>
  );
};
