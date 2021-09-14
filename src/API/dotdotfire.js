import axios from "axios";
import qs from "qs";

const url = process.env.REACT_APP_API_DOT_DOT_FIRE;

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
  ForgetPassword = async (data) => {
    const options = {
      method: "POST",
      url: `${url}/users/forgot-password`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        accept: "*/*",
      },
      data: qs.stringify({ email: data.email }),
    };
    const dataResponse = await axios.request(options);
    return dataResponse;
  };

  ResetPassword = async (data) => {
    const options = {
      method: "POST",
      url: `${url}/users/reset-password`,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: qs.stringify({
        token: data.token,
        password: data.pass,
        password2: data.pass2,
      }),
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

  getUser = async (token) => {
    const options = {
      method: "GET",
      url: `${url}/users/details`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const dataResponse = axios.request(options);
    return dataResponse;
  };

  updatePassword = async (data) => {
    const options = {
      method: "POST",
      url: `${url}/users/set-password`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${data.accessToken}`,
      },
      data: qs.stringify(data),
    };
    return axios.request(options);
  };
}
