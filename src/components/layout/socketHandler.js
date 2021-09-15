import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  updateUser,
  setRoomsList,
  addNewRoom,
  removeRoom,
  changeDescription,
  changeName,
  updateSetting,
  addSeat,
  updateSeat,
  removePlayer,
  updateLeaderboard
} from "../../redux/feature/reducer";
import { socket } from "../../socket";
import { useHistory } from "react-router-dom";
import { saveLeaderBoardDemo } from "../../services/commonService"; /* REMOVE IT ON PRODUCTION */

export const SocketHandler = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  /* REMOVE IT ON PRODUCTION */
  const roomSelect = useSelector(({ roomSelect }) => roomSelect);
  useEffect(() => {
    if (process.env.REACT_APP_USE_DEMO_LEADER_BOARD && roomSelect.roomID) {
        dispatch(updateLeaderboard(saveLeaderBoardDemo(roomSelect.roomID)));
    }
  }, [dispatch, roomSelect, roomSelect.roomID])
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
    socket.on("updateRoomSeat", (data) => {
      dispatch(updateSeat(data));
    });
    socket.on("removeRoomSeat", (data) => {
      dispatch(removePlayer(data));
    });

    // Leader page
    socket.on("updateLeaderboard", (data) => {
      dispatch(updateLeaderboard(data));
    });

    // Error handler
    socket.on("connect_error", (err) => {
      if (err.message.indexOf('JsonWebTokenError') > -1) {
        history.push("/login");
      }
    });

    socket.on("error", (err) => {
      if (err.message.indexOf('JsonWebTokenError') > -1) {
        history.push("/login");
      }
    });

    // Component will unmount
    return () => {
      socket.off('loadUser', () => {});
      socket.off('updateUserDetail', () => {});
      socket.off('loadAllRooms', () => {});
      socket.off('addRoom', () => {});
      socket.off('removeRoom', () => {});
      socket.off('updateRoomName', () => {});
      socket.off('updateRoomDescription', () => {});
      socket.off('updateRoomSetting', () => {});
      socket.off('addRoomSeat', () => {});
      socket.off('updateRoomSeat', () => {});
      socket.off('removeRoomSeat', () => {});
      socket.off('updateLeaderboard', () => {});
      socket.off('connect_error', () => {});
      socket.off('error', () => {});
    };
  }, [dispatch, history]);

  return (
    <div></div>
  );
}
