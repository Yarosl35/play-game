import axios from "axios";
import qs from "qs";
const url = "http://getplatform.dotdotfire.ga/api/v1";

export class Api {
  LoginUser = async (data) => {
    try {
      const dataLogin = await axios.post(
        `${url}/users/login`,
        qs.stringify(data)
      );
      return dataLogin;
    } catch (error) {
      console.warn(error);
    }
  };
  register = async (data) => {
    try {
      const dataResponse = await axios.post(
        `${url}/users/register`,
        qs.stringify(data)
      );
      return dataResponse;
    } catch (error) {
      console.warn(error);
    }
  };
  getUser = async () => {
    try {
      const dataUser = await axios.get(`${url}/users/details`, {
        headers: {
          "Content-Type": "application/json",
          Authentication: "",
          Prefer: "",
        },
      });
      return dataUser;
    } catch (error) {
      console.warn(error);
    }
  };
}
// namenew@gmail.com
// 987654qwerty
