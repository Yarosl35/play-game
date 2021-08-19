import React from "react";
import styles from "./layout.module.css";
import { TopBar } from "./TopBar";

export const Board = ({ children }) => {
  return (
    <div className={styles.test}>
      <TopBar />
      <div className={styles.leaderContainer}>
        <div className={styles.leftBar}></div>
        <div>{children}</div>
      </div>
    </div>
  );
};
