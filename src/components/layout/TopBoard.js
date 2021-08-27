import styles from "./layout.module.css";
import React from "react";
import Logo from "./logo.svg";
import LogoUser from "./logoUser.svg";
import { Link } from "react-router-dom";

export const TopBoard = () => {
  return (
    <div className={styles.topBar}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <img className={styles.logo} src={Logo} alt="logo" />
      </Link>
      <div className={styles.containerMenuBoard}>
        <img className={styles.logoUser} src={LogoUser} alt="Logo user" />
      </div>
    </div>
  );
};
