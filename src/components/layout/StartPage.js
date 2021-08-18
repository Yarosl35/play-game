import React from "react";
import styles from "./layout.module.css";
import Logo from "./logo.svg";

export const StartPage = ({ children }) => {
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
      <div className={styles.containerStart}>
        <div>{children}</div>
      </div>
    </div>
  );
};
