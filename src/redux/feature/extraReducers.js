import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

import { socket } from "./../../socket/index";
import { Api } from "../../API/dotdotfire";

const userAPI = new Api();

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
export const registrationUser = createAsyncThunk(
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
export const forgetPassword = createAsyncThunk(
  "users/forgetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userAPI.ForgetPassword(data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "users/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userAPI.ResetPassword(data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

//socket
export const createRoom = createAsyncThunk("users/createRoom", async (data) => {
  socket.emit("createRoom", data);
});
export const updateOptionEmit = createAsyncThunk(
  "users/updateOptionEmit",
  async (data) => {
    socket.emit("updateRoomSetting", {
      roomID: data.roomID,
      setting: data.setting,
    });
  }
);

export const changeNameEmit = createAsyncThunk(
  "users/changeName",
  async (data) => {
    socket.emit("updateRoomName", {
      roomID: data.roomID,
      name: data.name,
    });
  }
);
export const changeDescriptionEmit = createAsyncThunk(
  "users/changeDescription",
  async (data) => {
    socket.emit("updateRoomDescription", {
      roomID: data.roomID,
      description: data.description,
    });
  }
);
export const createRoomSeatEmit = createAsyncThunk(
  "users/createRoomSeatEmit",
  async (data) => {
    socket.emit("createRoomSeat", {
      roomID: data.roomID,
      ownerName: data.name,
      ownerEmail: data.email,
      ownerClass: data.class,
    });
  }
);
export const removeRoomSeatEmit = createAsyncThunk(
  "users/removeRoomSeat",
  async (data) => {
    socket.emit("removeRoomSeat", {
      roomID: data.roomID,
      seatCode: data.seatCode,
    });
  }
);
