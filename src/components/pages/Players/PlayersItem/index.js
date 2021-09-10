import { useState } from "react";
import copyIcon from "./copy.svg";
import removeIcon from "./remove.svg";
import { useDispatch } from "react-redux";
import { removeRoomSeatEmit } from "./../../../../redux/feature/extraReducers";

import styles from "./PlayersItem.module.css";
export const PlayersItem = ({ data }) => {
  const dispatch = useDispatch();
  const removePlayer = (roomID, seatCode) => {
    dispatch(removeRoomSeatEmit({ roomID, seatCode }));
  };
  const [MousePosition, setMousePosition] = useState({
    left: 0,
    top: 0,
  });
  const [showHideUpdateRow, setShowHideUpdateRow] = useState(false);
  function handleMouseMove(ev) {
    setShowHideUpdateRow(true);
    setMousePosition({ left: ev.screenX, top: ev.screenY });
  }

  return (
    <li>
      <div
        style={{ display: "flex", alignItems: "center", height: "100%" }}
        onMouseMove={(ev) => handleMouseMove(ev)}
        onMouseOut={() => setShowHideUpdateRow(false)}
      >
        <div className={styles.name}>{data.ownerName}</div>
        <div
          className={`${styles.status} ${
            data.status === "Waiting"
              ? styles.statusWaiting
              : data.status === "Playing"
              ? styles.statusPlaying
              : styles.statusOffline
          }`}
        >
          {" "}
          N/A
          {/* {data.status} */}
        </div>
        <div className={styles.seatCode}>{data.invitationCode}</div>
      </div>
      <div className={styles.remove}>
        <img
          onClick={() => removePlayer(data.roomID, data.seatCode)}
          src={removeIcon}
          alt={"remove"}
        />
      </div>
      <div className={styles.link}>
        <img
          onClick={() => {
            navigator.clipboard.writeText(
              `${process.env.REACT_APP_COPY_URL}${data.roomID}|${data.invitationCode}`
            );
          }}
          src={copyIcon}
          alt={"copy"}
        />
      </div>
      {showHideUpdateRow ? (
        <div
          className={styles.tooltip}
          style={{
            left: MousePosition.left + (MousePosition.left > 700 ? -550 : 4),
            top: MousePosition.top - (MousePosition.top > 600 ? 400 : 70),
          }}
        >
          <div>
            <p>player name: {data.ownerName}</p>
            <p>status: not</p>
            <p>seat code: {data.seatCode}</p>
            <p>region: {data.region}</p>
            <p>IP address: {data.ipAddress}</p>
          </div>
        </div>
      ) : null}
    </li>
  );
};
