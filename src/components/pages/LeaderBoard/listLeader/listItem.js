import React, { useState } from "react";
import up from "./../FullScreen/img/up.svg";
import down from "./../FullScreen/img/down.svg";
import styles from "./leaderList.module.css";

export const ListItem = ({ name, color, score, rank, status, data }) => {
  return (
    <div className={styles.listItem} style={{ background: color }}>
      <div className={`${styles.rank} ${styles.cellLeader} `}>
        <p>{rank}</p>
      </div>
      <div className={`${styles.name} ${styles.cellLeader} `}>
        <p>{name}</p>
      </div>

      <div className={`${styles.score} ${styles.cellLeader} `}>
        <p>{score}</p>
      </div>
      <div className={`${styles.state} ${styles.cellLeader} `}>
        {!data.hasOwnProperty("state") ? null : data.state === "up" ? (
          <img className={styles.stateImg} src={up} alt="up" />
        ) : data.state === "down" ? (
          <img className={styles.stateImg} src={down} alt="down" />
        ) : null}
      </div>
      <div className={`${styles.cellLeader}`}>
        <div className={`${styles.rankState} ${styles[status]}`}></div>
      </div>
    </div>
  );
};
