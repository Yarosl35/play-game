import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

import { Api } from "../../API/dotdotfire";
const userAPI = new Api();

const initialState = {
  user: { email: "", token: "" },
  roomSelect: null,
  auth: null,
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

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    closeModal(state) {
      state.createdUserShow = { show: false, text: "" };
    },
    roomListSelect(state, action) {
      console.log(action);
      state.roomSelect = action.payload;
    },
  },
  extraReducers: {
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
  },
});

export const { closeModal, roomListSelect } = counterSlice.actions;

export default counterSlice.reducer;
