import React from "react";
import styles from "./leaderList.module.css";
import ContextIcon from "../../icon/ContextIcon.png";

export const ListItem = ({ name, color, scope, rank }) => {
  return (
    <div className={styles.listItem}>
      <div className={`${styles.rank} ${styles.cellLeader} `}>
        <p>{rank}</p>
      </div>
      <div className={`${styles.name} ${styles.cellLeader} `}>
        <p>{name}</p>
      </div>
      <div className={`${styles.scope} ${styles.cellLeader} `}>
        <p>{scope}</p>
      </div>
      <div className={`${styles.context} ${styles.cellLeader} `}>
        <img src={ContextIcon} alt="context" />
      </div>
    </div>
  );
};
