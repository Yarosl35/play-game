import styles from "./layout.module.css";
import React, { useState } from "react";
import { useHistory } from "react-router";
import Logo from "./logo.svg";
import LogoUser from "./logoUser.svg";
import { Link } from "react-router-dom";

export const TopBoard = () => {
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();
  const selectProfile = () => {
    setShowMenu(false);
    history.push("/user");
  };
  return (
    <div className={styles.topBar}>
      <Link
        to={process.env.REACT_APP_REDIRECT_MAIN_PAGE}
        style={{ textDecoration: "none" }}
      >
        <img className={styles.logo} src={Logo} alt="logo" />
      </Link>
      <div className={styles.containerMenuBoard}>
        <div
          onClick={() => {
            setShowMenu((stateShow) => !stateShow);
          }}
          className={styles.topBarMenu}
        >
          <img className={styles.logoUser} src={LogoUser} alt="Logo user" />
        </div>
        {showMenu ? (
          <ul className={styles.menuList}>
            <li onClick={selectProfile}>Profile</li>
            <li>Log out</li>
          </ul>
        ) : null}
      </div>
    </div>
  );
};
