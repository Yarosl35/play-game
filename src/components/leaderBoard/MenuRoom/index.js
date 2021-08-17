import { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./MenuRoom.module.css";
import btnLogo from "./btnLogo.svg";
import { RoomItem } from "./RoomItem";

export const MenuRoom = ({ arrayList, changeRoom }) => {
  const [value, setValue] = useState(1);
  const [showList, setShowList] = useState(false);

  const changeInput = (value) => {
    setValue(value);
    changeRoom(value);
    setShowList(false);
  };

  const showChange = () => {
    setShowList((show) => !show);
  };

  const listMenuItem = arrayList.map(({ room }) => {
    return <RoomItem key={room} changeInput={changeInput} room={room} />;
  });

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setShowList(false);
      }}
    >
      <label className={styles.labelList} htmlFor="list">
        <input
          className={styles.select}
          id="list"
          value={`room ${value}`}
          readOnly
        />
        <div className={styles.btnList} onClick={showChange}>
          <img
            src={btnLogo}
            alt="btn"
            style={{
              transform: showList ? "rotate(180deg)" : "rotate(0deg)",
              transition: "0.5s",
            }}
          />
        </div>
        {showList ? <div className={styles.options}>{listMenuItem}</div> : null}
      </label>
    </OutsideClickHandler>
  );
};
