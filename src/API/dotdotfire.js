import axios from "axios";
const url =
  "https://stoplight.io/mocks/dotdotfire/get-platform/17529590/api/v1";

export class Api {
  LoginUser = async () => {
    try {
      const dataLogin = await axios.post(`${url}/users/login`, {
        email: "",
        password: "",
      });
      return dataLogin;
    } catch (error) {
      console.warn(error);
    }
  };
  register = async () => {
    try {
      const dataLogin = await axios.post(`${url}/users/register`, {
        email: "",
        password: "",
        fullName: "",
        school: "",
        jobPosition: "",
      });
      return dataLogin;
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
