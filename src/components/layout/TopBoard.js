import styles from "./layout.module.css";
import React, { useState } from "react";
import Logo from "./logo.svg";
import LogoUser from "./logoUser.svg";
import { Link } from "react-router-dom";
import OutsideClickHandler from "react-outside-click-handler";

export const TopBoard = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className={styles.topBar}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <img className={styles.logo} src={Logo} alt="logo" />
      </Link>
      <div className={styles.containerMenuBoard}>
        {/* <Link to="/login"> */}
        {/* <OutsideClickHandler
          onOutsideClick={() => {
            setShowMenu((e) => !e);
          }}
        > */}
        <img
          className={styles.logoUser}
          src={LogoUser}
          alt="Logo user"
          onClick={() => {
            setShowMenu(true);
          }}
        />
        {/* {showMenu ? <div className={styles.loginMenu}></div> : null} */}
        {/* </Link> */}
        {/* </OutsideClickHandler> */}
      </div>
    </div>
  );
};
