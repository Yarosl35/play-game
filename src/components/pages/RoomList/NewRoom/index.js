import { useState } from "react";
import { useDispatch } from "react-redux";
import { SelectList } from "./SelectList";
import { createRoom } from "../../../../redux/feature/extraReducers";
import styles from "./NewRoom.module.css";
const arrayList = [
  { id: 1, name: "coming soon 1", value: "1" },
  { id: 2, name: "coming soon 2", value: "2" },
];
export const NewRoom = ({ setShowModal }) => {
  const [roomName, setRoomName] = useState("");
  const dispatch = useDispatch();
  const [valueList, setValueList] = useState(arrayList[0].value);
  const change = (value) => {
    setValueList(value);
  };
  function sendCreateNewRoomRequest() {
    const newRoomDate = {
      type: "The-Neighbormood",
      name: roomName,
      description: "Just description",
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
            className={styles.newRoomInp}
            value={roomName}
            onChange={changeNameRoom}
            className={styles.inputRoomName}
          />
          <p>Game type</p>
          <SelectList arrayList={arrayList} change={change} />
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
