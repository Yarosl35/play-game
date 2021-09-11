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
  errorPass: { show:false, text: ""},
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
      state.errorPass.show = false;
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
      state.errorPass = { show: true, text: action.payload.msg };
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
  addSeat,
  removePlayer,
  passNotError,
} = counterSlice.actions;

export default counterSlice.reducer;
