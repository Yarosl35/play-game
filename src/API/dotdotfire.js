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
    // console.log("token api", token);
    // const options = {
    //   method: "GET",
    //   url: `${url}/users/details`,
    //   headers: {
    //     // "Content-Type": "application/json",
    //     Authentication: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxMTF0ZXN0QG1haWwuY29tIiwiaWF0IjoxNjMwNTEwNzM3LCJleHAiOjE2MzgyODY3Mzd9.GA39zQmrx3LFjnA-T5u85QjioTEWu1SJic-gXvz-2Cw`,
    //   },
    // };

    // const dataResponse = await axios.request(options);
    const dataResponse = await axios.get(`${url}/users/details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return dataResponse;
  };
}
// namenew@gmail.com
// 987654qwerty
