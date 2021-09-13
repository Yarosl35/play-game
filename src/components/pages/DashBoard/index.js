import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import logo from "./logo.svg";
import styles from "./DashBoard.module.css";
import { Board } from "../../layout/Board";
import {
  changeNameEmit,
  changeDescriptionEmit,
} from "../../../redux/feature/extraReducers";

export const DashBoard = () => {
  const dispatch = useDispatch();
  const roomSelect = useSelector(({ roomSelect }) => roomSelect);
  const [nameRoom, setNameRoom] = useState("");
  const [descriptionRoom, setDescriptionRoom] = useState("");
  const [type, setType] = useState("");
  const [loaderName, setLoaderName] = useState(false);
  const [loaderDescription, setLoaderDescription] = useState(false);
  const [saveNameTimeout, setSaveNameTimeout] = useState(null);
  const [saveDescriptionTimeout, setSaveDescriptionTimeout] = useState(null);

  const innerFunction = useCallback(() => {
    if (roomSelect.roomID || roomSelect.roomID === 0) {
      setNameRoom(roomSelect.name);
      setDescriptionRoom(roomSelect.description);
      setType(roomSelect.type);
    }
  }, [roomSelect]);
  useEffect(() => {
    innerFunction();
  }, [innerFunction]);

  const saveName = (name) => {
    clearTimeout(saveNameTimeout);
    setSaveNameTimeout(setTimeout(function () {
      setLoaderName(false);
      if (!nameRoom) return false;
      dispatch(
        changeNameEmit({
          roomID: roomSelect.roomID,
          name: name,
        })
      );
    }, 1000));
  }

  const saveDescription = (description) => {
    clearTimeout(saveDescriptionTimeout);
    setSaveDescriptionTimeout(setTimeout(function () {
      setLoaderDescription(false);
      if (!descriptionRoom) return false;
      dispatch(
        changeDescriptionEmit({
          roomID: roomSelect.roomID,
          description: description,
        })
      );
    }, 1000));
  }

  return (
    <Board>
      <div className={styles.containerFlex}>
        <div className={styles.mainContainer}>
          <div className={styles.blockOption}>
            <p className={styles.textMain}>Game type</p>
            <div className={styles.gameType}>
              <img src={logo} alt="logo" />
              <p>{ type }</p>
              {/*<button className={styles.btnChange}>Change</button>*/}
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
                    saveName(e.target.value);
                  }}
                />
                {loaderName ? (
                  <span style={{ fontSize: "2em" }}>
                    {" "}
                    &nbsp;&nbsp; saving...
                  </span>
                ) : null}
              </div>
              <div>
                <p>Room description</p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <textarea
                    className={styles.roomDescription}
                    type="text"
                    value={descriptionRoom}
                    onChange={(e) => {
                      setDescriptionRoom(e.target.value);
                      setLoaderDescription(true);
                      saveDescription(e.target.value);
                    }}
                  />
                  {loaderDescription ? (
                    <span style={{ fontSize: "2em" }}>
                      {" "}
                      &nbsp;&nbsp; saving...
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Board>
  );
};
