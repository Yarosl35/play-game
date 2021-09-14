import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./SelectList.module.css";
import btnLogo from "./btnLogo.svg";
import { ListItem } from "./ListItem";

export const SelectList = ({ change, arrayList, value }) => {
  if (typeof value === 'undefined' || value === null) {
    value = arrayList[0].name;
  }
  const [selectedValue, setSelectedValue] = useState(value);
  const [showList, setShowList] = useState(false);

  const changeInput = ({ value, name }) => {
    setSelectedValue(name);
    change(value);
    setShowList(false);
  };

  const showChange = () => {
    setShowList((show) => !show);
  };

  const listMenuItems = arrayList.map((value) => {
    return <ListItem key={value.id} changeInput={changeInput} data={value} />;
  });

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setShowList(false);
      }}
    >
      <label className={styles.labelList} htmlFor="list">
        <input className={styles.select} id="list" value={selectedValue} readOnly />
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
        {showList ? (
          <div className={styles.options}>{listMenuItems}</div>
        ) : null}
      </label>
    </OutsideClickHandler>
  );
};
