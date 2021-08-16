import React from "react";
import { leaderData } from "./data/leaderData";
import { ListLeader } from "./listLeader/index";
import styles from "./leaderBoard.module.css";

export const LeaderBoard = () => {
  return (
    <div className={styles.mainContainer}>
      <ListLeader />
    </div>
  );
};
