import React, { useEffect, useState } from "react";
import styles from "./Players.module.css";
import { PlayersItem } from "./PlayersItem";
import { useFormik } from "formik";
import {
  removePlayer,
} from "../../../redux/feature/reducer";
import {
  createRoomSeatEmit
} from "../../../redux/feature/extraReducers";
import { Board } from "../../layout/Board";
import { useDispatch, useSelector } from "react-redux";

export const Players = () => {
  const dispatch = useDispatch();
  const roomSelect = useSelector(({ roomSelect }) => roomSelect);

  const [seats, setSeats] = useState(roomSelect.seats);
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
  });

  useEffect(() => {
    setSeats(roomSelect.seats);
  }, [roomSelect.seats]);

  return (
    <Board>
      <div className={styles.mainContainer}>
        <div className={styles.containerBtn}>
          <button className={styles.importBtn}>Import seats by csv</button>
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
                      type="email"
                      onChange={formData.handleChange}
                      value={formData.values.email}
                    />
                  </span>
                </div>
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
