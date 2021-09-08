import React, { useState, forwardRef, useEffect } from "react";
import styles from "./RoomOption.module.css";
import calendar from "./calendar.svg";
import DatePicker from "react-datepicker";
import { useSelector, useDispatch } from "react-redux";
import { updateOptionEmit } from "../../../redux/feature/reducer";
import { socket } from "./../../../socket";
import { Board } from "../../layout/Board";
import { Switch } from "./../../queries/Switch";
import "react-datepicker/dist/react-datepicker.css";

export const RoomOption = () => {
  const dispatch = useDispatch();
  const roomSelect = useSelector(({ roomSelect }) => roomSelect);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [speed, setSpeed] = useState(0);
  const [switchBicycle, setSwitchBicycle] = useState(false);
  const [switchBus, setSwitchBus] = useState(false);

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
    const updateDate = {
      roomID: roomSelect.page,
      setting: {
        timeSetting: {
          startTime: startDate,
          endTime: endDate,
        },
        gameSetting: {
          questCSV: `too long to display..`,
          allowBicycle: switchBicycle,
          allowBus: switchBus,
          maximumSpeed: speed,
        },
      },
    };
    dispatch(updateOptionEmit(updateDate));
  }, [
    dispatch,
    speed,
    switchBicycle,
    switchBus,
    startDate,
    endDate,
    roomSelect,
  ]);
  console.log("roomSelect 12345", roomSelect);
  useEffect(() => {
    if (roomSelect.page) {
      const {
        roomSelected: { settings },
      } = roomSelect;
      setSwitchBicycle(settings.gameSetting.allowBicycle);
      setSwitchBus(settings.gameSetting.allowBus);
      setSpeed(settings.gameSetting.maximumSpeed);
    }
  }, [roomSelect]);
  useEffect(() => {
    socket.on("updateRoomSetting", (data) => {
      console.log("updateRoomSetting", data);
    });

    return () => {
      socket.off("updateRoomSetting", (data) => {
        console.log("updateRoomSetting", data);
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
