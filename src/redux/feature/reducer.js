import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../API/dotdotfire";
const userAPI = new Api();

const initialState = {
  user: { email: "", token: "" },
  register: null,
  auth: null,
};

export const loginUser = createAsyncThunk("users/loginUser", async (data) => {
  const response = await userAPI.LoginUser(data);
  return response.data;
});
export const registerUser = createAsyncThunk("users/Register", async (data) => {
  const response = await userAPI.register(data);
  return response.data;
});

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers: {
    [loginUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.auth = true;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.register = action.payload;
    },
  },
});

export const {} = counterSlice.actions;

export default counterSlice.reducer;
