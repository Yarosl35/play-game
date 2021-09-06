import React, { useState, useEffect } from "react";
import { leaderData } from "./data/leaderData";
import { ListLeader } from "./listLeader/index";
import styles from "./leaderBoard.module.css";
import { SelectList } from "../../queries/SelectList";
import { Board } from "../../layout/Board";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

export const LeaderBoard = () => {
  const socket = useSelector(({ socket }) => socket);
  const [leaderListRoom, setLeaderListRoom] = useState(leaderData[0].list);

  const changeRoom = (room) => {
    const roomSelected = leaderData.find((e) => e.room === room);
    setLeaderListRoom(roomSelected.list);
  };
  const forList = leaderData.map(({ room }) => {
    return {
      id: `room ${room}`,
      name: `room ${room}`,
      value: room,
    };
  });
  useEffect(() => {
    if (socket) {
      console.log(socket);
      io(process.env.REACT_APP_WS_URL);
      socket.on("room", (e) => console.log("room", e));
    }
  }, [socket]);
  // console.log(dt);
  console.log(socket);
  return (
    <Board>
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
    </Board>
  );
};
