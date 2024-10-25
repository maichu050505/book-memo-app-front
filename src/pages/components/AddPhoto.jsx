import { useRef, useState } from "react";
import "../app.scss";
import styles from "./AddPhoto.module.scss";

export const AddPhoto = () => {
  // input要素の参照を作成
  const fileInputRef = useRef(null);
  // 画像の状態を管理
  const [selectedImages, setSelectedImages] = useState([]); // 初期状態は空の配列で1つのコンポーネント

  const file = () => {
    //fileInputRef.currentは、その参照先（つまり、<input type="file" />要素）を指す。fileInputRef.currentが null ではないこと（つまり、input要素が正しく参照されていること）を確認するための条件文です。なぜなら、useRefで最初に作られたときには fileInputRef.current は null になっていて、コンポーネントがレンダリングされた後にDOM要素と関連付けられるからです。もし fileInputRef.current が null のままだと、click() メソッドを呼び出そうとしたときにエラーが発生してしまいます。そのため、まずは参照が存在することを確認しています。
    if (fileInputRef.current) {
      //click() は、HTMLの input 要素に存在するメソッドで、プログラム的にその要素をクリックしたことにするもの。
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // filesが存在し、長さが0より大きいか確認
      const imageUrls = []; // 選択した画像のURLを格納する配列
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imageUrl = URL.createObjectURL(file); // 画像のURLを生成
        imageUrls.push(imageUrl); // URLを配列に追加
      }
      setSelectedImages(imageUrls); // 画像を状態に保存
    }
  };

  const clearImages = (e) => {
    e.stopPropagation(); // クリックイベントのバブリングを防ぐ
    setSelectedImages([]); // 画像をクリア
  };

  const handleImageClick = (e) => {
    e.stopPropagation(); // クリックイベントのバブリングを防ぐ
    file(); // 画像をクリックしたときにファイル選択ダイアログを開く
  };
  return (
    <div className="add" onClick={file}>
      {selectedImages.length === 0 ? ( // 画像が選択されていない場合
        <button className="linkButton white_blue">画像を選択</button>
      ) : null}
      <input
        ref={fileInputRef}
        className={styles.file_button}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange} // ファイル選択時に呼ばれる関数
      />
      {selectedImages.length > 0 && ( // 画像が選択された場合に表示
        <div className={styles.imageContainer}>
          <button onClick={clearImages} className={styles.clearButton}>
            <img src="./img/icon_delete.svg" width="20px" height="20px" alt="x" />
          </button>
          {selectedImages.map(
            (
              image,
              index // 選択された画像を表示
            ) => (
              <img
                key={index}
                src={image}
                alt={`選択した画像 ${index + 1}`}
                className={styles.selectedImages}
                onClick={handleImageClick} // 画像をクリックするとファイル選択ダイアログを開く
                //ユーザーが画像を選択して表示されている状態で、画像をクリックするとファイル選択ダイアログが開きます。キャンセルボタンを押した場合、handleFileChange関数は呼び出されないため、選択した画像はクリアされず、そのまま表示され続けます。画像を新たに選択した場合、選択された画像が更新されます。
              />
            )
          )}
        </div>
      )}
    </div>
  );
};
