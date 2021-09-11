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
  user: { email: "", token: "" },
  listRooms: null,
  userDetails: null,
  roomSelect: { roomId: null },
  auth: null,
  resetPasswordSuccess: false,
  socket: null,
  forgetPasswordLink: false,
  forgetPasswordError: false,
  loginError: false,
  errorPass: false,
  emailUserError: false,
  createdUserShow: { show: false, text: "" },
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    closeModal(state) {
      state.createdUserShow = { show: false, text: "" };
    },
    setRoomsList(state, listRooms) {
      const newArrRoom = listRooms.payload.map((room) => {
        return { ...room, seats: Object.values(room.seats) };
      });
      state.listRooms = newArrRoom;
    },
    roomListSelect(state, action) {
      const roomSelected = state.listRooms.filter(
        ({ roomID }) => roomID === action.payload
      );
      state.roomSelect = {
        roomSelected: roomSelected[0],
        players: roomSelected[0].seats,
        roomId: action.payload,
      };
    },
    loginNotError(state) {
      state.loginError = false;
    },
    passNotError(state) {
      state.errorPass = false;
    },
    addNewRoom(state, data) {
      state.listRooms.push(data.payload);
    },
    addNewPlayer(state, data) {
      state.listRooms.push(data.payload);
    },
    changeName(state, data) {
      const index = state.listRooms.findIndex(
        ({ roomID }) => roomID === data.payload.roomID
      );
      const oldRoom = state.listRooms[index];
      const updatedRoom = {
        ...oldRoom,
        name: data.payload.name,
      };
      const newArr = [
        ...state.listRooms.slice(0, index),
        updatedRoom,
        ...state.listRooms.slice(index + 1),
      ];
      state.listRooms = newArr;
      // Update name to selected room
      state.roomSelect.roomSelected.name = data.payload.name;
    },
    changeDescription(state, data) {
      const index = state.listRooms.findIndex(
        ({ roomID }) => roomID === data.payload.roomID
      );
      const oldRoom = state.listRooms[index];
      const updatedRoom = {
        ...oldRoom,
        description: data.payload.description,
      };
      const newArr = [
        ...state.listRooms.slice(0, index),
        updatedRoom,
        ...state.listRooms.slice(index + 1),
      ];
      state.listRooms = newArr;
      // Update description to selected room
      state.roomSelect.roomSelected.description = data.payload.description;
    },
    updateSetting (state, data) {
      const setting = data.payload.setting;
      if (!setting) return false;

      const stateSetting = state.roomSelect.roomSelected.setting;

      // Update setting
      const timeSetting = setting.timeSetting;
      if (timeSetting) {
        if (timeSetting.hasOwnProperty('startTime')) stateSetting.timeSetting.startTime = timeSetting.startTime;
        if (timeSetting.hasOwnProperty('endTime')) stateSetting.timeSetting.endTime = timeSetting.endTime;
      }

      const gameSetting = setting.gameSetting;
      if (gameSetting) {
        if (gameSetting.hasOwnProperty('allowBicycle')) stateSetting.gameSetting.allowBicycle = gameSetting.allowBicycle;
        if (gameSetting.hasOwnProperty('allowBus')) stateSetting.gameSetting.allowBus = gameSetting.allowBus;
        if (gameSetting.hasOwnProperty('maximumSpeed')) stateSetting.gameSetting.maximumSpeed = gameSetting.maximumSpeed;
      }
      state.roomSelect.roomSelected.setting = stateSetting;
    },
    addSeat(state, data) {
      const index = state.listRooms.findIndex(
        ({ roomID }) => roomID === data.payload.roomID
      );
      const changedRoom = state.listRooms[index];
      const seatsArr = changedRoom.seats;
      const changedRoomSeats = [...seatsArr, data.payload.seat];
      const updatedRoom = { ...changedRoom, seats: changedRoomSeats };
      const newArr = [
        ...state.listRooms.slice(0, index),
        updatedRoom,
        ...state.listRooms.slice(index + 1),
      ];
      state.listRooms = newArr;
      state.roomSelect = { ...state.roomSelect, players: changedRoomSeats };
    },
    removePlayer(state, data) {
      const index = state.listRooms.findIndex(
        ({ roomID }) => roomID === data.payload.roomID
      );
      const changedRoom = state.listRooms[index];
      const seatsArr = changedRoom.seats;
      const changedRoomSeats = seatsArr.filter(
        (el) => el.seatCode !== data.payload.seatCode
      );
      const updatedRoom = { ...changedRoom, seats: changedRoomSeats };
      const newArr = [
        ...state.listRooms.slice(0, index),
        updatedRoom,
        ...state.listRooms.slice(index + 1),
      ];
      state.listRooms = newArr;
      state.roomSelect = { ...state.roomSelect, players: changedRoomSeats };
    },
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
      state.errorPass = true;
    },
    //change dashboard
  },
});

export const {
  closeModal,
  roomListSelect,
  loginNotError,
  connectSocket,
  setRoomsList,
  addNewRoom,
  changeName,
  changeDescription,
  updateSetting,
  addSeat,
  removePlayer,
  passNotError,
} = counterSlice.actions;

export default counterSlice.reducer;
