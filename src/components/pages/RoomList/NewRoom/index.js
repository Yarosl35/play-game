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
  const [requiredRoomName, setRequiredRoomName] = useState(false);
  const change = (value) => {
    setValueList(value);
  };
  function sendCreateNewRoomRequest() {
    const newRoomDate = {
      type: valueList,
      name: roomName,
      description: "",
    };

    if (!validateData()) return false;

    dispatch(createRoom(newRoomDate));
    setShowModal(false);
  }

  const validateData = (attribute, value) => {
    let isValid = true;
    // Validate room name
    if (attribute === 'roomName' || !attribute) {
      if (typeof value === 'undefined') value = roomName;
      if (!value || !value.replace(/ /g, '')) {
        setRequiredRoomName(true);
        isValid = false;
      } else {
        setRequiredRoomName(false);
      }
    }

    return isValid;
  }

  const changeNameRoom = (e) => {
    setRoomName(e.target.value);
    validateData('roomName', e.target.value);
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
          { requiredRoomName ? <div className={styles.errorMessage}>Error: This field is required.</div> : null }
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
