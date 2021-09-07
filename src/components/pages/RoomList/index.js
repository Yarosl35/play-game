import React, { useState, useEffect } from "react";
import styles from "./Rooms.module.css";
import { RoomsItem } from "./RoomsItem";
import { Panel } from "../../layout/Panel";
import { NewRoom } from "./NewRoom";
import { socket } from "./../../../socket";
import { useDispatch, useSelector } from "react-redux";
import { setRoomsList } from "./../../../redux/feature/reducer";

export const RoomList = () => {
  const [showNewRoom, setShowNewRoom] = useState(false);
  const listRooms = useSelector(({ listRooms }) => listRooms);

  const dispatch = useDispatch();
  const changeShowRoom = () => {
    setShowNewRoom((show) => !show);
  };

  useEffect(() => {
    socket.on("loadAllRooms", (data) => {
      dispatch(setRoomsList(Object.values(data)));
    });

    return socket.off("loadAllRooms", (data) => {
      console.log(data);
    });
  }, [dispatch]);
  if (!listRooms) return null;
  console.log(listRooms);
  const listItems = listRooms.map((data) => {
    return <RoomsItem key={data.roomID} data={data} />;
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
