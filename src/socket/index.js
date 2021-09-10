import { io } from "socket.io-client";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const socket = io(process.env.REACT_APP_WS_URL, {
  auth: {
    // token: `accountToken: ${cookies.get("userToken").token}`,
    token: `accountToken: test`,
  },
});
