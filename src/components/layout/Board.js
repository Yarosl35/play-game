import React from "react";
import styles from "./layout.module.css";
import { TopBoard } from "./TopBoard";
import console from "./imgsMenu/console.svg";
import dashboard from "./imgsMenu/dashboard.svg";
import leaderBoard from "./imgsMenu/leaderboard.svg";
import options from "./imgsMenu/options.svg";
import permissions from "./imgsMenu/permissions.svg";
import players from "./imgsMenu/players.svg";
import { NavLink } from "react-router-dom";

export const Board = ({ children }) => {
  return (
    <div className={styles.test}>
      <TopBoard />
      <div className={styles.leaderContainer}>
        <div className={styles.leftBar}>
          <ul>
            <li>
              <NavLink
                to="/dash-board"
                activeClassName={styles.selected}
                className={styles.linkStyle}
                style={{ textDecoration: "none" }}
              >
                <img src={dashboard} alt="icon" />
                <p>Dashboard</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/room-options"
                activeClassName={styles.selected}
                className={styles.linkStyle}
                style={{ textDecoration: "none" }}
              >
                <img src={options} alt="icon" />
                <p>Options</p>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/players"
                activeClassName={styles.selected}
                className={styles.linkStyle}
                style={{ textDecoration: "none" }}
              >
                <img src={players} alt="icon" />
                <p>Players</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/permissions"
                activeClassName={styles.selected}
                className={styles.linkStyle}
                style={{ textDecoration: "none" }}
              >
                <img src={permissions} alt="icon" />
                <p>Permissions</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/console"
                activeClassName={styles.selected}
                className={styles.linkStyle}
                style={{ textDecoration: "none" }}
              >
                <img src={console} alt="icon" />
                <p>Console</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/leader-board"
                activeClassName={styles.selected}
                className={styles.linkStyle}
                style={{ textDecoration: "none" }}
              >
                <img src={leaderBoard} alt="icon" />
                <p>LeaderBoard</p>
              </NavLink>
            </li>
          </ul>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
