import { io } from "socket.io-client";
import Cookies from "universal-cookie";
const cookies = new Cookies();

/**
 * Init socket, token can be null
 * @type {Socket}
 */
export const socket = io(process.env.REACT_APP_WS_URL, {
  auth: {
    token: `accountToken: ${ (cookies.get("userToken") || {}).token }`,
  }
});

/**
 * Reconnect socket with updated token
 * Use for login after case
 */
export const reconnectSocket = () => {
  socket.disconnect();
  socket.auth.token = `accountToken: ${ (cookies.get("userToken") || {}).token }`;
  socket.open();
}