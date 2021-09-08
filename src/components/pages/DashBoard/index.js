import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDebounce } from "./../../queries/use-debounce";
import { socket } from "./../../../socket";

import logo from "./logo.svg";
import styles from "./DashBoard.module.css";
import { Board } from "../../layout/Board";
import {
  changeNameEmit,
  changeDescriptionEmit,
  changeName,
  changeDescription,
} from "../../../redux/feature/reducer";
// import { Loader } from "../../queries/loader/loader";

export const DashBoard = () => {
  const [nameRoom, setNameRoom] = useState("");
  const [descriptionRoom, setDescriptionRoom] = useState("");
  const [loaderName, setLoaderName] = useState(false);
  const [loaderDescription, setLoaderDescription] = useState(false);
  const roomSelect = useSelector(({ roomSelect }) => roomSelect);
  console.log(roomSelect);
  const dispatch = useDispatch();

  useEffect(() => {
    if (roomSelect.page || roomSelect.page === 0) {
      setNameRoom(roomSelect.roomSelected.name);
      setDescriptionRoom(roomSelect.roomSelected.description);
    }
  }, [roomSelect]);

  const debouncedName = useDebounce(nameRoom, 700);
  const debouncedDescription = useDebounce(descriptionRoom, 700);
  useEffect(() => {
    if (roomSelect)
      if (debouncedDescription) {
        setLoaderDescription(false);
        dispatch(
          changeDescriptionEmit({
            roomID: roomSelect.roomSelected.roomID,
            description: debouncedDescription,
          })
        );
      }
  }, [debouncedDescription, dispatch, roomSelect]);
  useEffect(() => {
    if (roomSelect)
      if (debouncedName) {
        console.log("debouncedName", debouncedName);
        setLoaderName(false);
        dispatch(
          changeNameEmit({
            roomID: roomSelect.roomSelected.roomID,
            name: debouncedName,
          })
        );
      }
  }, [debouncedName, dispatch, roomSelect]);
  useEffect(() => {
    socket.on("updateRoomName", (data) => {
      dispatch(changeName(data));
    });
    socket.on("updateRoomDescription", (data) => {
      dispatch(changeDescription(data));
    });
    return () => {
      socket.off("updateRoomName", (data) => {
        console.log("updateRoomName", data);
      });
      socket.off("updateRoomDescription", (data) => {
        console.log("updateRoomDescription", data);
      });
    };
  }, [dispatch]);
  if (!roomSelect) return null;
  return (
    <Board>
      <div className={styles.containerFlex}>
        <div className={styles.mainContainer}>
          <div className={styles.blockOption}>
            <p className={styles.textMain}>Game type</p>
            <div className={styles.gameType}>
              <img src={logo} alt="logo" />
              <p>The Neighbormood Competition</p>
              <button className={styles.btnChange}>Change</button>
            </div>
          </div>
          <div className={styles.blockOption}>
            <p className={styles.textMain}>Room Details</p>
            <div className={styles.roomDetails}>
              <div>
                <p>Room name</p>
                <input
                  className={styles.roomName}
                  type="text"
                  value={nameRoom}
                  onChange={(e) => {
                    setNameRoom(e.target.value);
                    setLoaderName(true);
                  }}
                />
                {loaderName ? (
                  <>
                    {/* <Loader />  */}
                    saving...
                  </>
                ) : null}
              </div>
              <div>
                <p>Room description</p>
                <textarea
                  className={styles.roomDescription}
                  type="text"
                  value={descriptionRoom}
                  onChange={(e) => {
                    setDescriptionRoom(e.target.value);
                    setLoaderDescription(true);
                  }}
                />
                {loaderDescription ? (
                  <>
                    {/* <Loader />  */}
                    saving...
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Board>
  );
};
