import React from "react";
import styles from "./layout.module.css";

export const Board = ({ children }) => {
  return (
    <div className={styles.test}>
      <div className={styles.topBar}></div>
      <div className={styles.leaderContainer}>
        <div className={styles.leftBar}></div>
        <div>{children}</div>
    </div>
    </div>
  );
};
