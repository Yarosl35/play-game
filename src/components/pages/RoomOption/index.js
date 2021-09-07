import React, { useState, forwardRef, useEffect } from "react";
import styles from "./RoomOption.module.css";
import calendar from "./calendar.svg";
import DatePicker from "react-datepicker";
import { Board } from "../../layout/Board";
import { Switch } from "./../../queries/Switch";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";

export const RoomOption = () => {
  const roomSelect = useSelector(({ roomSelect }) => roomSelect);
  const [startDate, setStartDate] = useState(new Date());
  const [speed, setSpeed] = useState(0);
  const [switchBicycle, setSwitchBicycle] = useState(false);
  const [switchBus, setSwitchBus] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const CustomInputDate = forwardRef(({ value, onClick }, ref) => (
    <div className={styles.blockCustomInput}>
      <input type="text" className={styles.inputDate} value={value} readOnly />
      <img
        className={styles.IconDate}
        src={calendar}
        onClick={onClick}
        ref={ref}
        alt={"calendar"}
      />
    </div>
  ));
  useEffect(() => {
    if (roomSelect) {
      const {
        roomSelected: { settings },
      } = roomSelect;
      setSwitchBicycle(settings.gameSetting.allowBicycle);
      setSwitchBus(settings.gameSetting.allowBus);
      setSpeed(settings.gameSetting.maximumSpeed);
    }
  }, [roomSelect]);
  if (!roomSelect) return null;
  return (
    <Board>
      <div className={styles.containerFlex}>
        <div className={styles.mainContainer}>
          <div className={styles.blockOption}>
            <p className={styles.textMain}>Time setting</p>
            <div className={styles.blockForDate}>
              <div className={styles.inputContainer}>
                <p className={styles.pOption}>Start time</p>
                <div>
                  <DatePicker
                    popperPlacement="bottom-end"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    timeInputLabel="Time:"
                    dateFormat="MM/dd/yyyy h:mm aa"
                    showTimeInput
                    customInput={<CustomInputDate />}
                  />
                </div>
              </div>
              <div className={styles.inputContainer}>
                <p className={styles.pOption}>End time</p>
                <div>
                  <DatePicker
                    popperPlacement="bottom-end"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    timeInputLabel="Time:"
                    dateFormat="MM/dd/yyyy h:mm aa"
                    showTimeInput
                    customInput={<CustomInputDate />}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.blockOption}>
            <p className={styles.textMain}>Game quest</p>
            <div className={styles.gameQuest}>
              <p className={styles.pOption}>Quest csv</p>
              <button className={styles.uploadCsv}>upload csv</button>
            </div>
          </div>
          <div className={styles.blockOption}>
            <p className={styles.textMain}>Game setting</p>
            <div className={styles.gameSetting}>
              <div className={styles.miniContainer}>
                <p className={styles.pOption}>allow bicycle</p>
                <div className={styles.centerGameSetOption}>
                  <Switch value={switchBicycle} setValue={setSwitchBicycle} />
                </div>
              </div>
              <div className={styles.miniContainer}>
                <p className={styles.pOption}>allow bus</p>
                <div className={styles.centerGameSetOption}>
                  <Switch value={switchBus} setValue={setSwitchBus} />
                </div>
              </div>
              <div className={styles.miniContainer}>
                <p className={styles.pOption}>maximum speed</p>
                <div className={styles.centerGameSetOption}>
                  <input
                    className={styles.inputSpeed}
                    type="number"
                    value={speed}
                    onChange={(e) => setSpeed(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Board>
  );
};
