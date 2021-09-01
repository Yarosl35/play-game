import React, { useState } from "react";
import styles from "./Rooms.module.css";
import { playersData } from "./data/playersData";
import { RoomsItem } from "./RoomsItem/index";
import { Panel } from "../../layout/Panel";
import { NewRoom } from "./NewRoom";

export const RoomList = () => {
  const [showNewRoom, setShowNewRoom] = useState(false);
  const changeShowRoom = () => {
    setShowNewRoom((show) => !show);
  };
  const listItems = playersData.map((data) => {
    return <RoomsItem key={data.id} data={data} />;
  });

  return (
    <Panel>
      {showNewRoom ? <NewRoom setShowModal={setShowNewRoom} /> : null}
      <div className={styles.containerFlex}>
        <div className={styles.mainContainer}>
          <div className={styles.containerBtn}>
            <button className={styles.importBtn} onClick={changeShowRoom}>
              Create new room
            </button>
          </div>
          <div className={styles.containerScroll}>
            <ul className={styles.roomList}>{listItems}</ul>
          </div>
        </div>
      </div>
    </Panel>
  );
};
