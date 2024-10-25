import styles from "./MemoBox.module.scss";

export const MemoBox = () => {
  return (
    <div className={styles.memoBox}>
      <div className={styles.txt}>
        <p>ここにメモを入力。ここにメモを入力。ここにメモを入力。</p>
        <p>ここにメモを入力。ここにメモを入力。</p>
        <p>
          ここにメモを入力。ここにメモを入力。
          <br />
          ここにメモを入力。
        </p>
      </div>

      <div className={styles.screenshot}>
        <img src="./img/screenshot1.jpg" alt="" />
      </div>
    </div>
  );
};
