import React, {useCallback, useEffect, useState} from "react";
import styles from "./Players.module.css";
import { PlayersItem } from "./PlayersItem";
import { useFormik } from "formik";
import {
  removePlayer,
  setPopupMessage
} from "../../../redux/feature/reducer";
import {
  createRoomSeatEmit,
  createMultiRoomSeat
} from "../../../redux/feature/extraReducers";
import { Board } from "../../layout/Board";
import { useDispatch, useSelector } from "react-redux";
import { CreatePlayerSchema, isEmail } from "../../../services/validationService";
import { parseCSV } from "../../../services/commonService";
import {IMPORT_CSV_CHUCK, SUCCESS, ERROR, SIZE} from '../../../constants';
import { socket } from "../../../socket";

export const Players = () => {
  const dispatch = useDispatch();
  const roomSelect = useSelector(({ roomSelect }) => roomSelect);
  const [seats, setSeats] = useState(roomSelect.seats);
  const [waitImportResponse, setWaitImportResponse] = useState();

  const addNewPlayer = (dataPlayer) => {
    dispatch(createRoomSeatEmit({ ...dataPlayer, roomID: roomSelect.roomID }));
  };

  const formData = useFormik({
    initialValues: {
      name: "",
      email: "",
      class: "",
    },
    onSubmit: (values) => {
      addNewPlayer(values);
      formData.resetForm();
    },
    validationSchema: CreatePlayerSchema
  });

  const onUploadFile = (e) => {
    if (!e.target.files || !e.target.files.length) {
      e.target.value = null;
      return false;
    }

    parseCSV(e.target.files[0], {
      complete: (result) => {
        if (result.errors && result.errors.length) {
          e.target.value = null;
          dispatch(setPopupMessage({ message: result.errors[0].message, type: ERROR }));
          return false;
        }

        let errorList = [];
        let seatList = result.data.map((data, index) => {
          const ownerEmail = data[0];
          const ownerClass = data[1];
          const ownerName = data[2];
          let errors = [];
          if (!isEmail(ownerEmail)) errors.push('Invalid email.');
          if (!ownerName || !ownerName.trim()) errors.push('Name is required.');
          if (errors.length) errorList.push({ line: index + 1, errors });
          return { ownerEmail, ownerClass, ownerName }
        })

        if (errorList.length) {
          let errorMessage = 'Errors:<br>';
          for(let i = 0; i < errorList.length; i++) {
            errorMessage += `Line ${errorList[i].line}: ${errorList[i].errors.join(' ')} <br>`;
            if (i >= 9) {
              errorMessage += '...';
              break;
            }
          }
          e.target.value = null;
          dispatch(setPopupMessage({ message: errorMessage, type: ERROR, size: SIZE.LG }));
          return false;
        }

        e.target.value = null;
        setWaitImportResponse(true);

        let temporary;
        for (let i = 0, j = seatList.length; i < j; i += IMPORT_CSV_CHUCK) {
          temporary = seatList.slice(i, i + IMPORT_CSV_CHUCK);
          dispatch(createMultiRoomSeat({
            roomID: roomSelect.roomID,
            seatList: temporary
          }));
        }
      },
      error: (err, file, inputElem, reason) => {
        e.target.value = null;
        dispatch(setPopupMessage({ message: reason, type: ERROR }));
      }
    })
  }

  const onSuccess = (data) => {
    // Check imported
    if (waitImportResponse && data.roomID === roomSelect.roomID) {
      setWaitImportResponse(false);
      dispatch(setPopupMessage({ message: 'Successfully imported seats', type: SUCCESS }));
    }
  };

  const onError = (data) => {
    dispatch(setPopupMessage({ message: data.message, type: ERROR  }));
  };

  useEffect(() => {
    setSeats(roomSelect.seats);
  }, [roomSelect.seats]);

  useEffect(() => {
    socket.on("addRoomSeat", onSuccess);
    socket.on("error", onError);

    return (() => {
      socket.off("addRoomSeat", onSuccess);
      socket.off("error", onError);
    })
  }, [dispatch, onSuccess, onError]);

  return (
    <Board>
      <div className={styles.mainContainer}>
        <div className={styles.containerBtn}>
          <button className={styles.importBtn}>
            <label htmlFor="upload-player-input">
              <input type="file" id="upload-player-input" onChange={(e) => onUploadFile(e)}  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
              Import seats by csv
            </label>
          </button>
        </div>
        <div className={styles.namesList}>
          <div className={styles.name}>name</div>
          <div className={styles.status}>status</div>
          <div className={styles.seatCode}>seat code</div>
          <div className={styles.remove}>Remove</div>
          <div className={styles.link}>Share join link</div>
        </div>
        <div className={styles.containerScroll}>
          <ul className={styles.listPlayers}>
            {seats && Object.keys(seats).length > 0 ? (
              <>
                {Object.keys(seats).map((key) => {
                  return (
                    <PlayersItem
                      key={key}
                      data={seats[key]}
                      removePlayer={removePlayer}
                    />
                  );
                })}
              </>
            ) : (
              <div className={styles.playersInf}>no players</div>
            )}
          </ul>
        </div>
        <div className={styles.containerAddSeat}>
          <div className={styles.AddSeatText}>
            <p>Add seat</p>
          </div>
          <form onSubmit={formData.handleSubmit}>
            <div className={styles.containerForm}>
              <div className={styles.boxFormAddSeat}>
                <div>
                  <span className={styles.inputEmail}>
                    <label htmlFor="email">email</label>
                    <input
                      id="email"
                      name="email"
                      type="text"
                      onChange={formData.handleChange}
                      value={formData.values.email}
                    />
                  </span>
                </div>
                {formData.errors.email && formData.touched.email ? (
                  <div
                    className={styles.passwordError}
                  >{`Error: ${formData.errors.email}`}</div>
                ) : null}
                <div className={styles.boxFormAddSeatInput}>
                  <span className={styles.inputClass}>
                    <label htmlFor="class">class</label>
                    <input
                      id="class"
                      name="class"
                      type="class"
                      onChange={formData.handleChange}
                      value={formData.values.class}
                    />
                  </span>
                  <span className={styles.inputAddContainer}>
                    <label htmlFor="email">name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      onChange={formData.handleChange}
                      value={formData.values.name}
                    />
                  </span>
                </div>
                {formData.errors.name && formData.touched.name ? (
                  <div
                    className={styles.passwordError}
                  >{`Error: ${formData.errors.name}`}</div>
                ) : null}
              </div>
              <button type="submit" className={styles.BtnAdd}>
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </Board>
  );
};
