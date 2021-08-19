import React from "react";
import styles from "./layout.module.css";
import Logo from "./logo.svg";
import { TopBar } from "./TopBar";

export const StartPage = ({ children }) => {
  return (
    <div className={styles.test}>
      <TopBar />
      <div className={styles.containerStart}>
        <div>{children}</div>
      </div>
    </div>
  );
};
