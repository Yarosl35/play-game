import { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./MenuRoom.module.css";
import btnLogo from "./btnLogo.svg";
import { ListItem } from "./ListItem";

export const SelectList = ({ arrayList, change, circle, inputBig }) => {
  const [value, setValue] = useState(arrayList[0].name);
  const [showList, setShowList] = useState(false);

  const changeInput = ({ value, name }) => {
    setValue(name);
    change(value);
    setShowList(false);
  };

  const showChange = () => {
    setShowList((show) => !show);
  };

  const listMenuItems = arrayList.map((value) => {
    return <ListItem key={value} changeInput={changeInput} data={value} />;
  });

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setShowList(false);
      }}
    >
      <label className={styles.labelList} htmlFor="list">
        <input
          className={inputBig ? styles.selectB : styles.select}
          id="list"
          value={value}
          readOnly
        />
        <div
          className={circle ? styles.btnList : styles.formListBig}
          onClick={showChange}
        >
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
          <div className={inputBig ? styles.optionsB : styles.options}>
            {listMenuItems}
          </div>
        ) : null}
      </label>
    </OutsideClickHandler>
  );
};
