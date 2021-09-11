import React, { useState, forwardRef, useEffect } from "react";
import styles from "./RoomOption.module.css";
import calendar from "./calendar.svg";
import DatePicker from "react-datepicker";
import { useSelector, useDispatch } from "react-redux";
import { updateOptionEmit } from "../../../redux/feature/extraReducers";
import { updateSetting } from "../../../redux/feature/reducer";
import { socket } from "./../../../socket";
import { Board } from "../../layout/Board";
import { Switch } from "./../../queries/Switch";
import "react-datepicker/dist/react-datepicker.css";
import {useDebounce} from "../../queries/use-debounce";

export const RoomOption = () => {
  const dispatch = useDispatch();
  const roomSelect = useSelector(({ roomSelect }) => roomSelect);

  let defaultValue = {
    'startDate': new Date(),
    'endDate': new Date(),
    'switchBicycle': false,
    'switchBus': false,
    'speed': 0
  }

  // If the data is exist
  if (roomSelect.roomId) {
    const setting = roomSelect.roomSelected.setting;
    const gameSetting = setting.gameSetting;
    const timeSetting = setting.timeSetting;
    if (timeSetting) {
      if (timeSetting.startTime) defaultValue.startDate = timeSetting.startTime;
      if (timeSetting.endTime) defaultValue.endDate = timeSetting.endTime;
    }

    if (gameSetting) {
      if (gameSetting.allowBicycle) defaultValue.switchBicycle = gameSetting.allowBicycle;
      if (gameSetting.allowBus) defaultValue.switchBus = gameSetting.allowBus;
      if (gameSetting.maximumSpeed) defaultValue.speed = gameSetting.maximumSpeed;
    }
  }

  const [startDate, setStartDate] = useState(defaultValue.startDate);
  const [endDate, setEndDate] = useState(defaultValue.endDate);
  const [switchBicycle, setSwitchBicycle] = useState(defaultValue.switchBicycle);
  const [switchBus, setSwitchBus] = useState(defaultValue.switchBus);
  const [speed, setSpeed] = useState(defaultValue.speed);

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

  // Delay before update
  const debouncedStartDate = useDebounce(startDate, 2000);
  const debouncedEndDate = useDebounce(endDate, 2000);
  const debouncedSwitchBicycle = useDebounce(switchBicycle, 2000);
  const debouncedSwitchBus = useDebounce(switchBus, 2000);
  const debouncedSpeed = useDebounce(speed, 2000);

  useEffect(() => {
    const data = {
      roomID: roomSelect.roomId,
      setting: {
        timeSetting: {
          startTime: new Date(debouncedStartDate).getTime(),
          endTime: new Date(debouncedEndDate).getTime(),
        },
        gameSetting: {
          questCSV: `too long to display..`,
          allowBicycle: debouncedSwitchBicycle,
          allowBus: debouncedSwitchBus,
          maximumSpeed: debouncedSpeed,
        },
      },
    };
    dispatch(updateOptionEmit(data));
  }, [
    dispatch,
    debouncedSwitchBicycle,
    debouncedSwitchBus,
    debouncedSpeed,
    debouncedStartDate,
    debouncedEndDate
  ]);

  useEffect(() => {
    if (roomSelect.roomId) {
      const setting = roomSelect.roomSelected.setting;
      const gameSetting = setting.gameSetting;
      const timeSetting = setting.timeSetting;
      if (timeSetting) {
        if (timeSetting.hasOwnProperty('startTime')) setStartDate(timeSetting.startTime);
        if (timeSetting.hasOwnProperty('endTime')) setEndDate(timeSetting.endTime);
      }
      if (gameSetting) {
        if (gameSetting.hasOwnProperty('allowBicycle')) setSwitchBicycle(gameSetting.allowBicycle);
        if (gameSetting.hasOwnProperty('allowBus')) setSwitchBus(gameSetting.allowBus);
        if (gameSetting.hasOwnProperty('maximumSpeed')) setSpeed(gameSetting.maximumSpeed);
      }
    }
  }, [roomSelect]);

  useEffect(() => {
    socket.on("updateRoomSetting", (data) => {
      dispatch(updateSetting(data));
    });

    return () => {
      socket.off("updateRoomSetting", (data) => {
        console.log("OFF");
      });
    };
  }, [dispatch]);
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
