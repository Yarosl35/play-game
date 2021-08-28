import React from "react";
import styles from "./layout.module.css";
import { TopBoard } from "./TopBoard";
import console from "./imgsMenu/console.svg";
import dashboard from "./imgsMenu/dashboard.svg";
import leaderBoard from "./imgsMenu/leaderboard.svg";
import options from "./imgsMenu/options.svg";
import permissions from "./imgsMenu/permissions.svg";
import players from "./imgsMenu/players.svg";
import { Link } from "react-router-dom";

export const Board = ({ children }) => {
  return (
    <div className={styles.test}>
      <TopBoard />
      <div className={styles.leaderContainer}>
        <div className={styles.leftBar}>
          <ul>
            <li>
              <img src={dashboard} alt="icon" />
              <p>Dashboard</p>
            </li>
            <Link to="room-options" style={{ textDecoration: "none" }}>
              <li>
                <img src={options} alt="icon" />
                <p>Options</p>
              </li>
            </Link>
            <Link to="players" style={{ textDecoration: "none" }}>
              <li>
                <img src={players} alt="icon" />
                <p>Players</p>
              </li>
            </Link>
            <li>
              <img src={permissions} alt="icon" />
              <p>Permissions</p>
            </li>
            <li>
              <img src={console} alt="icon" />
              <p>Console</p>
            </li>
            <Link to="leader-board" style={{ textDecoration: "none" }}>
              <li>
                <img src={leaderBoard} alt="icon" />
                <p>LeaderBoard</p>
              </li>
            </Link>
          </ul>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
