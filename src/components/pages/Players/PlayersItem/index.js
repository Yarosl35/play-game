import { useState } from "react";
import copyIcon from "./copy.svg";
import removeIcon from "./remove.svg";
import styles from "./PlayersItem.module.css";

export const PlayersItem = ({ data, removePlayer }) => {
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
        <div className={styles.name}>{data.name}</div>
        <div
          className={`${styles.status} ${
            data.status === "Waiting"
              ? styles.statusWaiting
              : data.status === "Playing"
              ? styles.statusPlaying
              : styles.statusOffline
          }`}
        >
          {data.status}
        </div>
        <div className={styles.seatCode}>{data.seatCode}</div>
      </div>
      <div className={styles.remove}>
        <img
          onClick={() => removePlayer(data.id)}
          src={removeIcon}
          alt={"remove"}
        />
      </div>
      <div className={styles.link}>
        <img
          onClick={() => {
            navigator.clipboard.writeText(data.link);
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
            <p>player name: {data.name}</p>
            <p>status: {data.status}</p>
            <p>seat code: {data.seatCode}</p>
            <p>region: {data.region}</p>
            <p>IP address: {data.ipAddress}</p>
          </div>
        </div>
      ) : null}
    </li>
  );
};
