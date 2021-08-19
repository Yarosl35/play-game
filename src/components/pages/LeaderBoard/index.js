import React, { useState } from "react";
import { leaderData } from "./data/leaderData";
import { ListLeader } from "./listLeader/index";
import styles from "./leaderBoard.module.css";
import { SelectList } from "../../queries/SelectList";

export const LeaderBoard = () => {
  const [leaderListRoom, setLeaderListRoom] = useState(leaderData[0].list);

  const changeRoom = (room) => {
    const roomSelected = leaderData.find((e) => e.room === room);
    setLeaderListRoom(roomSelected.list);
  };
  const forList = leaderData.map(({ room }) => {
    return {
      name: `room ${room}`,
      value: room,
    };
  });
  return (
    <div className={styles.mainContainer}>
      <div className={styles.selectContainer}>
        <div className={styles.containerForSelect}>
          <p className={styles.id}>Room ID :</p>{" "}
          <SelectList
            arrayList={forList}
            change={changeRoom}
            circle={true}
            inputBig={false}
          />
        </div>
      </div>
      <ListLeader arrayList={leaderListRoom} />
    </div>
  );
};
