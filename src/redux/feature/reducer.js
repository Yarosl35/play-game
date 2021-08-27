import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../API/dotdotfire";
const userAPI = new Api();

const initialState = {
  user: { email: "", token: "" },
  auth: null,
  loginError: false,
  emailUserError: false,
  createdUserShow: { show: false, text: "" },
};

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
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.auth = true;
      state.loginError = false;
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

export const { closeModal } = counterSlice.actions;

export default counterSlice.reducer;
