import React from "react";
import styles from "./layout.module.css";

export const StartPage = ({ children }) => {
  return (
    <div className={styles.test}>
      <div className={styles.topBar}></div>
      <div className={styles.containerStart}>
        <div>{children}</div>
      </div>
    </div>
  );
};
