import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import { socket } from "./../../socket/index";

import { Api } from "../../API/dotdotfire";
const userAPI = new Api();

const initialState = {
  user: { email: "", token: "" },
  listRooms: null,
  userDetails: null,
  roomSelect: { page: null },
  auth: null,
  socket: null,
  loginError: false,
  emailUserError: false,
  createdUserShow: { show: false, text: "" },
};

const cookies = new Cookies();

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userAPI.LoginUser(data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const registerUser = createAsyncThunk(
  "users/Register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userAPI.register(data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getUser = createAsyncThunk(
  "users/getUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userAPI.getUser(cookies.get("userToken").token);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const createRoom = createAsyncThunk("users/createRoom", async (data) => {
  socket.emit("createRoom", data);
});
export const updateOptionEmit = createAsyncThunk(
  "users/updateOptionEmit",
  async (data) => {
    console.log(data);
    socket.emit("updateRoomSetting", {
      roomID: data.roomID,
      setting: data.settings,
    });
  }
);

export const changeNameEmit = createAsyncThunk(
  "users/changeName",
  async (data) => {
    console.log("changeNameEmit", data);
    socket.emit("updateRoomName", {
      roomID: data.roomID,
      name: data.name,
    });
  }
);
export const changeDescriptionEmit = createAsyncThunk(
  "users/changeDescription",
  async (data) => {
    socket.emit(
      "updateRoomDescription",
      { roomID: data.roomID, description: data.description },
      function (a) {
        console.log(a);
      }
    );
  }
);
export const createRoomSeatEmit = createAsyncThunk(
  "users/createRoomSeatEmit",
  async (data) => {
    console.log(data);
    socket.emit("createRoomSeat", {
      roomID: data.roomID,
      ownerName: data.name,
      ownerEmail: data.email,
      // ownerClass: "test",
    });
  }
);

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    closeModal(state) {
      state.createdUserShow = { show: false, text: "" };
    },
    roomListSelect(state, action) {
      // console.log(action);
      const roomSelected = state.listRooms.filter(
        ({ roomID }) => roomID === action.payload
      );
      state.roomSelect = {
        roomSelected: roomSelected[0],
        players: Object.values(roomSelected[0].seats),
        page: action.payload,
      };
    },
    loginNotError(state) {
      state.loginError = false;
    },
    setRoomsList(state, data) {
      state.listRooms = data.payload;
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
      console.log(index);
    },
  },
  // cookies.get("userToken")
  extraReducers: {
    [changeNameEmit.fulfilled]: (state, action) => {
      // console.log("changeNameEmit", action);
    },
    [loginUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.auth = true;
      state.loginError = false;
      //add cookies
      cookies.set("userToken", { token: action.payload.accessToken });
    },
    [loginUser.rejected]: (state) => {
      state.loginError = true;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.createdUserShow = { show: true, text: action.payload.msg };
      state.emailUserError = false;
    },
    [registerUser.rejected]: (state) => {
      state.emailUserError = true;
    },
    [getUser.fulfilled]: (state, action) => {
      // console.log(action.payload);
    },
    [getUser.rejected]: (state, action) => {
      // console.log(action.payload);
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
} = counterSlice.actions;

export default counterSlice.reducer;
