import React from "react";
import styles from "./layout.module.css";
import { TopBoard } from "./TopBoard";

export const Panel = ({ children }) => {
  return (
    <div className={styles.test}>
      <TopBoard />
      <div className={styles.containerWebPanel}>
        <div>{children}</div>
      </div>
    </div>
  );
};
