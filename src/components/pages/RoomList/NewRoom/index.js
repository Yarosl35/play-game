import { useState } from "react";
import { useDispatch } from "react-redux";
import { SelectList } from "./SelectList";
import { createRoom } from "../../../../redux/feature/extraReducers";
import styles from "./NewRoom.module.css";
import { gameTypes } from "../data/gameTypes";

export const NewRoom = ({ setShowModal }) => {
  const [roomName, setRoomName] = useState("");
  const dispatch = useDispatch();
  const [valueList, setValueList] = useState(gameTypes[0].value);
  const change = (value) => {
    setValueList(value);
  };
  function sendCreateNewRoomRequest() {
    const newRoomDate = {
      type: valueList,
      name: roomName,
      description: "",
    };
    dispatch(createRoom(newRoomDate));
    setShowModal(false);
  }
  const changeNameRoom = (e) => {
    setRoomName(e.target.value);
  };

  return (
    <div className={styles.Modal}>
      <div className={styles.Modal_Body}>
        <p className={styles.title}>New room</p>
        <div className={styles.blockNewRoom}>
          <p>Room name</p>
          <input
            type="text"
            className={`${styles.newRoomInp} ${styles.inputRoomName}`}
            value={roomName}
            onChange={changeNameRoom}
          />
          <p>Game type</p>
          <SelectList arrayList={gameTypes} change={change} />
          <div className={styles.btnContainer}>
            <button
              onClick={() => {
                setShowModal((state) => false);
              }}
              className={styles.btn_cancel}
            >
              Cancel
            </button>
            <button
              className={styles.btn_create}
              onClick={sendCreateNewRoomRequest}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
