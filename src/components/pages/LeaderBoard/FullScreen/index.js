import React, { useState, useEffect, useCallback } from "react";
import { ListLeader } from "./../listLeader/index";
import { useSelector } from "react-redux";

import { Panel } from "./../../../layout/Panel";
import { TopBarFullScreen } from "./TopBarFullScreen";
import styles from "./FullScreen.module.css";

export const FullScreen = () => {
  const leaderBoard = useSelector(({ leaderBoard }) => leaderBoard);
  const roomSelect = useSelector(({ roomSelect }) => roomSelect);
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
    changeRoom(roomSelect.roomID);
  }, [leaderBoard, changeRoom, roomSelect, roomSelect.roomID]);
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
