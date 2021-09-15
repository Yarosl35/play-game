import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

import {
  loginUser,
  registrationUser,
  getUser,
  forgetPassword,
  resetPassword,
} from "./extraReducers";

const cookies = new Cookies();

const initialState = {
  user: { email: "", token: "", details: {} },
  listRooms: [],
  roomSelect: { roomID: null, seats: {} },
  auth: null,
  resetPasswordSuccess: false,
  socket: null,
  forgetPasswordLink: false,
  forgetPasswordError: false,
  loginError: false,
  errorPass: { show:false, text: ""},
  emailUserError: false,
  createdUserShow: { show: false, text: "" },
  leaderBoard: {},
  popupMessage: null,
  isShowLogoutConfirm: false
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    closeModal(state) {
      state.createdUserShow = { show: false, text: "" };
    },
    setPopupMessage (state, data) {
      state.popupMessage = data.payload;
    },
    setRoomsList(state, listRooms) {
      state.listRooms = [...listRooms.payload];
    },
    roomListSelect(state, action) {
      const roomSelected = state.listRooms.find(({ roomID }) => roomID === action.payload);
      state.roomSelect = { ...roomSelected };
    },
    loginNotError(state) {
      state.loginError = false;
    },
    passNotError(state) {
      state.errorPass.show = false;
    },
    updateUser (state, data) {
      const user = state.user;
      if (data.payload.email) user.email = data.payload.email;
      if (data.payload.details) user.details = { ...user.details, ...data.payload.details };
      if (data.payload.fullName) user.fullName = data.payload.fullName;
      if (data.payload.schoolName) user.schoolName = data.payload.schoolName;
      if (data.payload.jobPosition) user.jobPosition = data.payload.jobPosition;
      state.user = { ...user };
    },
    addNewRoom(state, data) {
      state.listRooms.push(data.payload);
    },
    removeRoom (state, data) {
      const roomList = state.listRooms.filter(({roomID}) => roomID !== data.payload.roomID);
      state.listRooms = [...roomList];
      // Remove selected room
      if (state.roomSelect.roomID === data.payload.roomID) {
        state.roomSelect = { roomID: null, seats: {} };
      }
    },
    addNewPlayer(state, data) {
      state.listRooms.push(data.payload);
    },
    changeName(state, data) {
      let { index, room } = getUpdatedRoom({ state, data });
      if (!room) return state;

      /* Logic start */
      room.name = data.payload.name;
      /* Logic end */

      updateRoomList({ state, index, room });
      updateSelectedRoom({ state, room });
    },
    changeDescription(state, data) {
      let { index, room } = getUpdatedRoom({ state, data });
      if (!room) return state;

      /* Logic start */
      room.description = data.payload.description;
      /* Logic end */

      updateRoomList({ state, index, room });
      updateSelectedRoom({ state, room });
    },
    updateSetting (state, data) {
      let { index, room } = getUpdatedRoom({ state, data });
      if (!room) return state;

      /* Logic start */
      const setting = data.payload.setting;
      let timeSetting = setting.timeSetting;
      if (timeSetting) {
        if (!room.setting.timeSetting) room.setting.timeSetting = {};
        if (timeSetting.hasOwnProperty('startTime')) room.setting.timeSetting.startTime = timeSetting.startTime;
        if (timeSetting.hasOwnProperty('endTime')) room.setting.timeSetting.endTime = timeSetting.endTime;
      }

      const gameSetting = setting.gameSetting;
      if (gameSetting) {
        if (!room.setting.gameSetting) room.setting.gameSetting = {};
        if (gameSetting.hasOwnProperty('questCSV')) room.setting.gameSetting.questCSV = gameSetting.questCSV;
        if (gameSetting.hasOwnProperty('allowBicycle')) room.setting.gameSetting.allowBicycle = gameSetting.allowBicycle;
        if (gameSetting.hasOwnProperty('allowBus')) room.setting.gameSetting.allowBus = gameSetting.allowBus;
        if (gameSetting.hasOwnProperty('maximumSpeed')) room.setting.gameSetting.maximumSpeed = gameSetting.maximumSpeed;
      }
      /* Logic end */

      updateRoomList({ state, index, room });
      updateSelectedRoom({ state, room });
    },
    addSeat(state, data) {
      let { index, room } = getUpdatedRoom({ state, data });
      if (!room) return state;

      /* Logic start */
      if (!room.seats) room.seats = {};
      room.seats[data.payload.seat.seatCode] = data.payload.seat;
      /* Logic end */

      updateRoomList({ state, index, room });
      updateSelectedRoom({ state, room });
    },
    updateSeat (state, data) {
      let { index, room } = getUpdatedRoom({ state, data });
      if (!room) return state;

      /* Logic start */
      if (!room.seats) room.seats = {};
      if (!room.seats[data.payload.seat.seatCode]) return state;
      room.seats[data.payload.seat.seatCode] = { ...room.seats[data.payload.seat.seatCode], ...data.payload.seat };
      /* Logic end */

      updateRoomList({ state, index, room });
      updateSelectedRoom({ state, room });
    },
    removePlayer(state, data) {
      let { index, room } = getUpdatedRoom({ state, data });
      if (!room) return state;

      /* Logic start */
      if (room.seats && room.seats[data.payload.seatCode]) {
        delete room.seats[data.payload.seatCode];
      }
      /* Logic end */

      updateRoomList({ state, index, room });
      updateSelectedRoom({ state, room });
    },
    updateLeaderboard (state, data) {
      let leaderBoard = state.leaderBoard;
      if (!leaderBoard) return state;
      leaderBoard[data.payload.roomID] = [...data.payload.leaderboard]
      state.leaderBoard = leaderBoard;
    },
    setIsShowLogoutConfirm (state, data) {
      state.isShowLogoutConfirm = data.payload;
    },
    logout (state) {
      // Clear cookie
      cookies.remove("userToken");
      cookies.remove("userEmail");

      // Set default value
      state.user = { email: "", token: "", details: {} };
      state.roomSelect = { roomID: null, seats: {} };
      state.auth = null;
    }
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.auth = true;
      state.loginError = false;
      //add cookies
      cookies.set("userToken", { token: action.payload.accessToken });
      cookies.set("userEmail", { email: action.payload.email });
    },
    [loginUser.rejected]: (state) => {
      state.loginError = true;
    },
    [registrationUser.fulfilled]: (state, action) => {
      state.createdUserShow = { show: true, text: action.payload.msg };
      state.emailUserError = false;
    },
    [registrationUser.rejected]: (state) => {
      state.emailUserError = true;
    },
    [forgetPassword.fulfilled]: (state, action) => {
      state.forgetPasswordLink = true;
    },
    [forgetPassword.rejected]: (state, action) => {
      state.forgetPasswordLink = false;
      state.forgetPasswordError = true;
    },
    [getUser.fulfilled]: (state, action) => {
      state.userDetails = action.payload.details;
    },
    [resetPassword.fulfilled]: (state, action) => {
      state.resetPasswordSuccess = true;
    },
    [resetPassword.rejected]: (state, action) => {
      state.resetPasswordSuccess = false;
      state.errorPass = { show: true, text: action.payload.msg };
    },
    //change dashboard
  },
});

const getUpdatedRoom = ({ state, data }) => {
  const index = state.listRooms.findIndex(({ roomID }) => roomID === data.payload.roomID);
  const room = state.listRooms[index];
  if (!room) return {
    index: -1,
    room: null
  }
  return {
    index,
    room
  }
}

const updateRoomList = ({ state, index, room }) => {
  const list = [
    ...state.listRooms.slice(0, index),
    room,
    ...state.listRooms.slice(index + 1),
  ];
  state.listRooms = list;
}

const updateSelectedRoom = ({ state, room }) => {
  if (state.roomSelect.roomID === room.roomID) {
    state.roomSelect = { ...room };
  }
}

export const {
  closeModal,
  setPopupMessage,
  roomListSelect,
  loginNotError,
  updateUser,
  setRoomsList,
  addNewRoom,
  removeRoom,
  changeName,
  changeDescription,
  updateSetting,
  addSeat,
  updateSeat,
  removePlayer,
  updateLeaderboard,
  passNotError,
  setIsShowLogoutConfirm,
  logout
} = counterSlice.actions;

export default counterSlice.reducer;
