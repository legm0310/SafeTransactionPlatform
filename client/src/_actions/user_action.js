/* 
(2) Action Creator
: Dispatch라는 열차에 Action을 태워서 보내줄 때 
  Dispatch에 inline으로 action을 넣는 것이 불편하기 때문에 action객체를 return 해주는 함수를 만들어놓는 것 (즉, Action을 return 해주는 함수)
*/

import axios from "axios";
import { SIGNUP_USER, LOGIN_USER, LOGOUT_USER, AUTH_USER } from "./type";

// 'withCredentials'속성을 'true'로 설정 --> 다른 도메인(client, server)에서 발급한 쿠키 제어 가능
// client, server 모두 설정해줘야함(cors)
axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
axios.defaults.withCredentials = true;

export function signup(dataToSubmit) {
  const request = axios
    .post("/api/auth/signup", dataToSubmit)
    .then((response) => response.data)
    .catch((err) => {
      console.log(err.response);
      return err.response.data;
    });
  return {
    type: SIGNUP_USER,
    payload: request,
  };
}

export function login(dataToSubmit) {
  const request = axios
    .post("/api/auth/login", dataToSubmit)
    .then((response) => {
      let accessToken = response.headers.get("Authorization");
      localStorage.setItem("accessToken", accessToken);
      return response.data;
    })
    .catch((err) => {
      console.log(err.response);
      return err.response.data;
    });
  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function logout() {
  const request = axios
    .get("/api/auth/logout")
    .then((response) => response.data)
    .catch((err) => {
      console.log(err.response);
      return err.response.data;
    });
  return {
    type: LOGOUT_USER,
    payload: request,
  };
}

export function auth() {
  const accessToken = localStorage.getItem("accessToken");
  const headers = { Authorization: accessToken };
  const request = axios
    .get("/api/auth/check", {
      headers,
    })
    .then((response) => {
      let newAccessToken = response.headers.get("Authorization");
      if (newAccessToken) {
        localStorage.setItem("accessToken", newAccessToken);
      }
      return response.data;
    })
    .catch((err) => {
      console.log(err.response);
      return err.response.data;
    });
  return {
    type: AUTH_USER,
    payload: request,
  };
}
