import React, {useState, useEffect, useCallback} from "react";
import { ListLeader } from "./listLeader/index";
import styles from "./leaderBoard.module.css";
import { SelectList } from "../../queries/SelectList";
import { Board } from "../../layout/Board";
import { useSelector } from "react-redux";

export const LeaderBoard = (callback, deps) => {
  const leaderBoard = useSelector(({ leaderBoard }) => leaderBoard);
  const roomSelect = useSelector(({ roomSelect }) => roomSelect);
  const listRooms = useSelector(({ listRooms }) => listRooms);
  const [roomSelection, setRoomSelection] = useState([]);
  const [leaderListRoom, setLeaderListRoom] = useState([]);

  const changeRoom = useCallback((roomID) => {
    const selectedLeaderBoard = leaderBoard[roomID] || [];
    setLeaderListRoom([...selectedLeaderBoard]);
  }, [leaderBoard]);

  useEffect(() => {
    const roomSelectionMap = listRooms ? listRooms.map((room) => {
      return {
        id: room.roomID,
        name: room.name,
        value: room.roomID,
      };
    }) : [];
    setRoomSelection(roomSelectionMap);
    changeRoom(roomSelect.roomID);
  }, [listRooms, changeRoom, roomSelect.roomID]);

  useEffect(() => {
    changeRoom(roomSelect.roomID);
  }, [leaderBoard, changeRoom, roomSelect, roomSelect.roomID]);

  return (
    <Board>
      <div className={styles.mainContainer}>
        <div className={styles.selectContainer}>
          <div className={styles.containerForSelect}>
            <p className={styles.id}>Room ID :</p>{" "}
            { (roomSelection && roomSelection.length > 0) ? <SelectList
              defaultValue={roomSelect ? roomSelect.name : undefined}
              arrayList={roomSelection}
              change={changeRoom}
              circle={true}
              inputBig={false}
            /> : '' }
          </div>
        </div>
        <ListLeader arrayList={leaderListRoom} />
      </div>
    </Board>
  );
};
