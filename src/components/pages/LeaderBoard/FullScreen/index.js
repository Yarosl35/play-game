import React, { useState, useEffect, useCallback } from "react";
import { ListLeader } from "./../listLeader/index";
import { SelectList } from "../../../queries/SelectList";
import { useSelector } from "react-redux";

import { Panel } from "./../../../layout/Panel";
import { TopBarFullScreen } from "./TopBarFullScreen";
import styles from "./FullScreen.module.css";

export const FullScreen = () => {
  const leaderBoard = useSelector(({ leaderBoard }) => leaderBoard);
  const roomSelect = useSelector(({ roomSelect }) => roomSelect);
  const listRooms = useSelector(({ listRooms }) => listRooms);
  const [roomSelection, setRoomSelection] = useState([]);
  const user = useSelector(({ user }) => user);
  const [leaderListRoom, setLeaderListRoom] = useState([]);

  const changeRoom = useCallback(
    (roomID) => {
      const selectedLeaderBoard = leaderBoard[roomID] || [];
      setLeaderListRoom([...selectedLeaderBoard]);
    },
    [leaderBoard]
  );

  useEffect(() => {
    const roomSelectionMap = listRooms
      ? listRooms.map((room) => {
          return {
            id: room.roomID,
            name: room.name,
            value: room.roomID,
          };
        })
      : [];
    setRoomSelection(roomSelectionMap);
    changeRoom(roomSelect.roomID);
  }, [listRooms, changeRoom, roomSelect.roomID]);

  useEffect(() => {
    changeRoom(roomSelect.roomID);
  }, [leaderBoard, changeRoom, roomSelect, roomSelect.roomID]);
  console.log("leaderBoard", user, leaderBoard);
  return (
    <Panel>
      <div className={styles.mainWrapper}>
        <TopBarFullScreen schoolName={user.details.schoolName} />
        <div className={styles.bg}>
          <div className={styles.mt}>
            <ListLeader arrayList={leaderListRoom} scroll={false} />
          </div>
        </div>
      </div>
    </Panel>
  );
};
