import React, { useState, forwardRef, useEffect } from "react";
import styles from "./RoomOption.module.css";
import calendar from "./calendar.svg";
import DatePicker from "react-datepicker";
import { useSelector, useDispatch } from "react-redux";
import { updateOptionEmit } from "../../../redux/feature/extraReducers";
import { Board } from "../../layout/Board";
import { Switch } from "../../queries/Switch";
import "react-datepicker/dist/react-datepicker.css";
import {useFormik} from "formik";

export const RoomOption = () => {
  const dispatch = useDispatch();
  const roomSelect = useSelector(({ roomSelect }) => roomSelect);
  const [updateSettingTimeout, setUpdateSettingTimeout] = useState(null);

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

  const formData = useFormik({
    initialValues: {
      roomID: roomSelect.roomID,
      startTime: new Date(),
      endTime: new Date(),
      questCSV: null,
      allowBicycle: false,
      allowBus: false,
      maximumSpeed: 0
    },
    onSubmit: (values) => {
      dispatch(updateOptionEmit({
        roomID: roomSelect.roomID,
        setting: {
          timeSetting: {
            startTime: new Date(values.startTime).getTime(),
            endTime: new Date(values.endTime).getTime(),
          },
          gameSetting: {
            questCSV: values.questCSV,
            allowBicycle: values.allowBicycle,
            allowBus: values.allowBus,
            maximumSpeed: values.maximumSpeed,
          }
        }
      }));
    }
  });

  const onChangeData = (attribute, value) => {
    // Set data to input
    formData.setFieldValue(attribute, value);
    clearTimeout(updateSettingTimeout);
    setUpdateSettingTimeout(setTimeout(function () {
      formData.submitForm()
        .then().catch(e => console.log(e));
    }, 1000));
  }

  const onUploadFile = (e) => {
    if (!e.target.files || !e.target.files.length) {
      e.target.value = null;
      return false;
    }

    try {
      let reader = new FileReader();
      reader.onload = function () {
        onChangeData('questCSV', reader.result);
      }
      reader.readAsText(e.target.files[0]);
      e.target.value = null;
    } catch(e) {
      console.log(e);
      e.target.value = null;
    }
  }

  useEffect(() => {
    if (roomSelect.roomID) {
      const setting = roomSelect.setting;
      const gameSetting = setting.gameSetting;
      const timeSetting = setting.timeSetting;
      if (timeSetting) {
        if (timeSetting.hasOwnProperty('startTime')) formData.setFieldValue('startTime', timeSetting.startTime);
        if (timeSetting.hasOwnProperty('endTime')) formData.setFieldValue('endTime', timeSetting.endTime);
      }
      if (gameSetting) {
        if (gameSetting.hasOwnProperty('allowBicycle')) formData.setFieldValue('allowBicycle', gameSetting.allowBicycle);
        if (gameSetting.hasOwnProperty('allowBus')) formData.setFieldValue('allowBus', gameSetting.allowBus);
        if (gameSetting.hasOwnProperty('maximumSpeed')) formData.setFieldValue('maximumSpeed', gameSetting.maximumSpeed);
      }
    }
  }, [roomSelect]);

  return (
    <Board>
      <form onSubmit={formData.handleSubmit}>
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
                      selected={formData.values.startTime}
                      onChange={(date) => onChangeData('startTime', date)}
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
                      selected={formData.values.endTime}
                      onChange={(date) => onChangeData('endTime', date) }
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
                <button type="button"  className={styles.uploadCsv}>
                  <label htmlFor="upload-file-input">
                    <input type="file" id="upload-file-input" onChange={(e) => onUploadFile(e)}  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
                    upload csv
                  </label>
                </button>
              </div>
            </div>
            <div className={styles.blockOption}>
              <p className={styles.textMain}>Game setting</p>
              <div className={styles.gameSetting}>
                <div className={styles.miniContainer}>
                  <p className={styles.pOption}>allow bicycle</p>
                  <div className={styles.centerGameSetOption}>
                    <Switch value={formData.values.allowBicycle} callback={ (value) => { onChangeData('allowBicycle', value) }} />
                  </div>
                </div>
                <div className={styles.miniContainer}>
                  <p className={styles.pOption}>allow bus</p>
                  <div className={styles.centerGameSetOption}>
                    <Switch value={formData.values.allowBus} callback={ (value) => { onChangeData('allowBus', value) }} />
                  </div>
                </div>
                <div className={styles.miniContainer}>
                  <p className={styles.pOption}>maximum speed</p>
                  <div className={styles.centerGameSetOption}>
                    <input
                      className={styles.inputSpeed}
                      type="number"
                      value={formData.values.maximumSpeed}
                      onChange={ (e) => onChangeData('maximumSpeed', e.target.value) }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Board>
  );
};
