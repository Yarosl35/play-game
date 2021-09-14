import React, { useState } from "react";
import styles from "./Rooms.module.css";
import { RoomsItem } from "./RoomsItem";
import { Panel } from "../../layout/Panel";
import { NewRoom } from "./NewRoom";
import { useSelector } from "react-redux";

export const RoomList = () => {
  const [showNewRoom, setShowNewRoom] = useState(false);
  const listRooms = useSelector(({ listRooms }) => listRooms);
  const changeShowRoom = () => {
    setShowNewRoom((show) => !show);
  };

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
            <ul className={styles.roomList}>
              {!listRooms ? (
                <li><div>No data</div></li>
              ) : (
                <>
                  {listRooms.map((data) => {
                    return <RoomsItem key={data.roomID} data={data} />;
                  })}
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </Panel>
  );
};
