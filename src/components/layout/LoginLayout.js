import React from "react";
import styles from "./layout.module.css";
import { TopBar } from "./TopBar";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const LoginLayout = ({ children }) => {
  const auth = cookies.get("roomID");
  const history = useHistory();
  useEffect(() => {
    if (auth) return history.push("/room-list");
  }, [auth, history]);
  return (
    <div className={styles.test}>
      <TopBar />
      <div className={styles.containerStart}>
        <div>{children}</div>
      </div>
    </div>
  );
};
