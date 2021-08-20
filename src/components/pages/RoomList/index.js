import React from "react";
import styles from "./Rooms.module.css";
import { playersData } from "./data/playersData";
import { RoomsItem } from "./RoomsItem/index";
import { Panel } from "../../layout/Panel";

export const RoomList = () => {
  const listItems = playersData.map((data) => {
    return <RoomsItem data={data} />;
  });

  return (
    <Panel>
      <div className={styles.containerFlex}>
        <div className={styles.mainContainer}>
          <div className={styles.containerBtn}>
            <button className={styles.importBtn}>Create new room</button>
          </div>
          <div className={styles.containerScroll}>
            <ul className={styles.roomList}>{listItems}</ul>
          </div>
        </div>
      </div>
    </Panel>
  );
};
