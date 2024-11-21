import styles from "./Heading.module.scss";

export const Heading = ({ children, type }) => {
    if (type == "h1") return <h1 className={styles.h1}>{children}</h1>;
    if (type == "h2") return <h2 className={styles.h2}>{children}</h2>;
    if (type == "h3") return <h3 className={styles.h3}>{children}</h3>;
};
