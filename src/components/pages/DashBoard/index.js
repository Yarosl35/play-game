import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import logo from "./logo.svg";
import styles from "./DashBoard.module.css";
import { Board } from "../../layout/Board";
import {
  changeNameEmit,
  changeDescriptionEmit,
} from "../../../redux/feature/reducer";

export const DashBoard = () => {
  const [nameRoom, setNameRoom] = useState("");
  const [descriptionRoom, setDescriptionRoom] = useState("");
  const roomSelect = useSelector(({ roomSelect }) => roomSelect);
  console.log("roomSelect:", roomSelect);

  const dispatch = useDispatch();
  const history = useHistory();
  const changeName = () => {
    console.log({
      roomID: roomSelect.roomSelected.roomID,
      name: nameRoom,
    });
    dispatch(
      changeNameEmit({
        roomID: roomSelect.roomSelected.roomID,
        name: nameRoom,
      })
    );
  };
  const changeDescription = () => {
    dispatch(
      changeNameEmit({
        roomID: roomSelect.roomSelected.roomID,
        description: descriptionRoom,
      })
    );
  };
  useEffect(() => {
    if (!roomSelect) {
      history.push(process.env.REACT_APP_REDIRECT_MAIN_PAGE);
    } else {
      history.push(`/dash-board/${roomSelect.page}`);
      setNameRoom(roomSelect.roomSelected.name);
      setDescriptionRoom(roomSelect.roomSelected.description);
    }
  }, [roomSelect, history]);
  if (!roomSelect) return null;
  // roomSelect.roomSelected.name

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
                  onChange={(e) => setNameRoom(e.target.value)}
                />
                <button onClick={changeName}> change name</button>
              </div>
              <div>
                <p>Room description</p>
                <input
                  className={styles.roomDescription}
                  type="text"
                  value={descriptionRoom}
                  onChange={(e) => setDescriptionRoom(e.target.value)}
                />
                <button onClick={changeDescription}> change description</button>
                {/* <p>School: {dataBoard.roomDescription.school}</p> */}
                {/* <p>Participants:</p> */}
                {/* <ul>
                    {dataBoard.roomDescription.participants.map(
                      (participant, index) => {
                        return (
                          <li key={index} type="disc">
                            {participant}
                          </li>
                        );
                      }
                    )}
                  </ul> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Board>
  );
};
