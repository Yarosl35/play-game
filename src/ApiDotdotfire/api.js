import axios from "axios";
const url = "https://stoplight.io/mocks/dotdotfire/get-platform/17529590";

export class Api {
  LoginUser = async () => {
    try {
      const dataLogin = await axios.post(`${url}/api/v1/users/login`, {
        email: "",
        password: "",
      });
      return dataLogin;
    } catch (error) {
      console.warn(error);
    }
  };
}
