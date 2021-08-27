import axios from "axios";
import qs from "qs";

const url = "https://getplatform.dotdotfire.com/api/v1";

export class Api {
  LoginUser = async (data) => {
    const options = {
      method: "POST",
      url: `${url}/users/login`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        accept: "*/*",
      },
      data: qs.stringify({ email: data.email, password: data.password }),
    };
    const dataResponse = await axios.request(options);
    return dataResponse;
  };
  register = async (data) => {
    const options = {
      method: "POST",
      url: `${url}/users/register`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        accept: "*/*",
      },
      data: qs.stringify({ email: data.email, password: data.password }),
    };
    const dataResponse = await axios.request(options);
    return dataResponse;
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
