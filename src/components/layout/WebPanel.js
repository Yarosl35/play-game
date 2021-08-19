import React from "react";
import styles from "./layout.module.css";
import { TopBar } from "./TopBar";

export const WebPanel = ({ children }) => {
  return (
    <div className={styles.test}>
      <TopBar />
      <div className={styles.containerWebPanel}>
        <div>{children}</div>
      </div>
    </div>
  );
};
