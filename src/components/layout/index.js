import React from "react";
import styles from "./layout.module.css";
import Logo from "./logo.svg";

export const Board = ({ children }) => {
  return (
    <div className={styles.test}>
      <div className={styles.topBar}>
        <img className={styles.logo} src={Logo} />
        <div className={styles.containerMenu}>
          <p>Play</p>
          <p>About</p>
          <p>Resource</p>
        </div>
      </div>
      <div className={styles.leaderContainer}>
        <div className={styles.leftBar}></div>
        <div>{children}</div>
      </div>
    </div>
  );
};
