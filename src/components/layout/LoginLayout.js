import React from "react";
import styles from "./layout.module.css";
import { TopBar } from "./TopBar";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export const LoginLayout = ({ children }) => {
  const auth = useSelector(({ auth }) => auth);
  const history = useHistory();
  useEffect(() => {
    if (auth) return history.push("/players");
  }, [auth]);
  return (
    <div className={styles.test}>
      <TopBar />
      <div className={styles.containerStart}>
        <div>{children}</div>
      </div>
    </div>
  );
};
