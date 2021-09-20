import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUser,
  setRoomsList,
  addNewRoom,
  removeRoom,
  changeDescription,
  changeName,
  updateSetting,
  addSeat,
  addRoomSeatList,
  updateSeat,
  removePlayer,
  updateLeaderBoard,
  setPopupMessage,
} from "../../redux/feature/reducer";
import { socket } from "../../socket";
import { useHistory } from "react-router-dom";
import { isUnauthorized, isNetworkError } from "../../services/authService";
import { ERROR } from "../../constants";
import { saveLeaderBoardDemo } from "../../services/commonService"; /* REMOVE IT ON PRODUCTION */

export const SocketHandler = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  /* REMOVE IT ON PRODUCTION */
  const roomSelect = useSelector(({ roomSelect }) => roomSelect);
  useEffect(() => {
    if (process.env.REACT_APP_USE_DEMO_LEADER_BOARD && roomSelect.roomID) {
      setInterval(() => {
        dispatch(updateLeaderBoard(saveLeaderBoardDemo(roomSelect.roomID)));
      }, 4000);
    }
  }, [dispatch, roomSelect, roomSelect.roomID]);
  /* REMOVE IT ON PRODUCTION */

  useEffect(() => {
    // User
    socket.on("loadUser", (data) => {
      dispatch(updateUser(data));
    });
    socket.on("updateUserDetail", (data) => {
      dispatch(updateUser(data));
    });

    // Room
    socket.on("loadAllRooms", (data) => {
      dispatch(setRoomsList(data));
    });
    socket.on("addRoom", (data) => {
      dispatch(addNewRoom(data));
    });
    socket.on("removeRoom", (data) => {
      dispatch(removeRoom(data));
    });

    // Dashboard
    socket.on("updateRoomName", (data) => {
      dispatch(changeName(data));
    });
    socket.on("updateRoomDescription", (data) => {
      dispatch(changeDescription(data));
    });

    // Option
    socket.on("updateRoomSetting", (data) => {
      dispatch(updateSetting(data));
    });

    // Player
    socket.on("addRoomSeat", (data) => {
      dispatch(addSeat(data));
    });
    socket.on("addRoomSeatList", (data) => {
      dispatch(addRoomSeatList(data));
    });
    socket.on("updateRoomSeat", (data) => {
      dispatch(updateSeat(data));
    });
    socket.on("removeRoomSeat", (data) => {
      dispatch(removePlayer(data));
    });

    // Leader page
    socket.on("updateLeaderBoard", (data) => {
      dispatch(updateLeaderBoard(data));
    });

    // Error handler
    socket.on("connect_error", (err) => {
      if (isNetworkError(err.message)) {
        dispatch(
          setPopupMessage({
            message: "Can not connect to server. Please reload the page.",
            type: ERROR,
            keep_alive: true,
          })
        );
      }

      if (isUnauthorized(err.message)) {
        history.push("/login");
      }
    });

    socket.on("error", (err) => {
      if (isUnauthorized(err.message)) {
        history.push("/login");
      }
    });

    // Component will unmount
    return () => {
      socket.off("loadUser");
      socket.off("updateUserDetail");
      socket.off("loadAllRooms");
      socket.off("addRoom");
      socket.off("removeRoom");
      socket.off("updateRoomName");
      socket.off("updateRoomDescription");
      socket.off("updateRoomSetting");
      socket.off("addRoomSeat");
      socket.off("updateRoomSeat");
      socket.off("removeRoomSeat");
      socket.off("updateLeaderBoard");
      socket.off("connect_error");
      socket.off("error");
    };
  }, [dispatch, history]);

  return <div></div>;
};
