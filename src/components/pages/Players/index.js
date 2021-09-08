import React, { useEffect, useState } from "react";
import styles from "./Players.module.css";
import { playersData } from "./data/playersData";
import { PlayersItem } from "./PlayersItem";
import { useFormik } from "formik";
import { createRoomSeatEmit } from "./../../../redux/feature/reducer";
import { Board } from "../../layout/Board";
import { socket } from "./../../../socket";
import { useDispatch, useSelector } from "react-redux";

export const Players = () => {
  const dispatch = useDispatch();
  const roomSelect = useSelector(({ roomSelect }) => roomSelect);
  const [arrPlayers, setArrPlayers] = useState(playersData);
  const addNewPlayer = (dataPlayer) => {
    dispatch(createRoomSeatEmit({ ...dataPlayer, roomID: roomSelect.page }));
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      class: "",
    },
    onSubmit: (values) => {
      addNewPlayer(values);
    },
  });

  const removePlayer = (idPlayer) => {
    setArrPlayers((arr) => arr.filter((el) => el.id !== idPlayer));
  };
  const listItems = arrPlayers.map((data, index) => {
    return <PlayersItem key={index} data={data} removePlayer={removePlayer} />;
  });
  useEffect(() => {
    socket.on("addRoomSeat", (data) => {
      console.log(data);
    });
    socket.on("removeRoomSeat", (data) => {
      console.log(data);
    });
    socket.on("updateRoomSeat", (data) => {
      console.log(data);
    });
    return () => {
      socket.on("removeRoomSeat", (data) => {
        console.log(data);
      });
      socket.on("updateRoomSeat", (data) => {
        console.log(data);
      });
      socket.of("addRoomSeat", (data) => {
        console.log(data);
      });
    };
  }, [dispatch]);
  console.log(roomSelect);
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
          <ul className={styles.listPlayers}>{listItems}</ul>
        </div>
        <div className={styles.containerAddSeat}>
          <div className={styles.AddSeatText}>
            <p>Add seat</p>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div className={styles.boxFormAddSeat}>
              <div className={styles.boxFormAddSeatInput}>
                <span className={styles.inputAddContainer}>
                  <label htmlFor="email">name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                </span>
                <span className={styles.inputAddContainer}>
                  <label htmlFor="email">email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                </span>
              </div>
              <span className={styles.inputAddContainer}>
                <label htmlFor="class">class</label>
                <input
                  id="class"
                  name="class"
                  type="class"
                  onChange={formik.handleChange}
                  value={formik.values.class}
                />
              </span>
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
