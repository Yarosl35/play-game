import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import logo from "./logo.svg";
import styles from "./DashBoard.module.css";
import { Board } from "../../layout/Board";
import { dataBoard } from "./data";
import "react-datepicker/dist/react-datepicker.css";

export const DashBoard = () => {
  const roomSelect = useSelector(({ roomSelect }) => roomSelect);
  const history = useHistory();

  useEffect(() => {
    if (!roomSelect) {
      history.push(process.env.REACT_APP_REDIRECT_MAIN_PAGE);
    } else history.push(`/dash-board/${roomSelect}`);
  }, [roomSelect, history]);

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
                <div className={styles.roomName}>
                  <p>{dataBoard.roomName}</p>
                </div>
              </div>
              <div>
                <p>Room description</p>
                <div className={styles.roomDescription}>
                  <p>School: {dataBoard.roomDescription.school}</p>
                  <p>Participants:</p>
                  <ul>
                    {dataBoard.roomDescription.participants.map(
                      (participant, index) => {
                        return (
                          <li key={index} type="disc">
                            {participant}
                          </li>
                        );
                      }
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Board>
  );
};
