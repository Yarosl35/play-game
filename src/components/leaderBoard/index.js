import React, { useState } from "react";
import { leaderData } from "./data/leaderData";
import { ListLeader } from "./listLeader/index";
import styles from "./leaderBoard.module.css";
import { MenuRoom } from "./MenuRoom";

export const LeaderBoard = () => {
  const [leaderListRoom, setLeaderListRoom] = useState(leaderData[0].list);

  const changeRoom = (room) => {
    const roomSelected = leaderData.find((e) => e.room === room);
    setLeaderListRoom(roomSelected.list);
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.selectContainer}>
        <div className={styles.containerForSelect}>
          <p className={styles.id}>Room ID :</p>{" "}
          <MenuRoom arrayList={leaderData} changeRoom={changeRoom} />
        </div>
      </div>
      <ListLeader arrayList={leaderListRoom} />
    </div>
  );
};
