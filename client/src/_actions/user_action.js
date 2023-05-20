/* 
(2) Action Creator
: Dispatch라는 열차에 Action을 태워서 보내줄 때 
  Dispatch에 inline으로 action을 넣는 것이 불편하기 때문에 action객체를 return 해주는 함수를 만들어놓는 것 (즉, Action을 return 해주는 함수)
*/

import axios from "axios";
import { SIGNUP_USER, LOGIN_USER, LOGOUT_USER, AUTH_USER } from "./type";

export function signup(dataToSubmit) {
  const request = axios
    .post(process.env.REACT_APP_API_BASE_URL + "/api/auth/signup", dataToSubmit)
    .then((response) => response.data);
  return {
    type: SIGNUP_USER,
    payload: request,
  };
}

export function login(dataToSubmit) {
  const request = axios
    .post(process.env.REACT_APP_API_BASE_URL + "/api/auth/login", dataToSubmit)
    .then((response) => {
      let accessToken = response.headers.get("Authorization");
      localStorage.setItem("accessToken", accessToken);
      let refreshToken = response.headers.get("Set-Cookie");
      document.cookie = refreshToken;

      return response.data;
    })
    .catch((error) => {
      return error.response;
    });
  // 서버에 데이터를 보낸 후, 서버에서 온 데이터 저장
  // ({loginSuccess: true, userId: user._id})

  // redux의 action -> 이를 dispatch를 통해 reducer로 보냄
  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function logout() {
  const request = axios
    .get(process.env.REACT_APP_API_BASE_URL + "/api/auth/logout", {
      // 'withCredentials'속성을 'true'로 설정하여 요청을 보낼 때 쿠키에 토큰을 추가
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
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
    .get(process.env.REACT_APP_API_BASE_URL + "/api/auth/check", {
      headers,
    })
    .then((response) => {
      if (response.headers.authorization) {
        localStorage.removeItem("accessToken");
        let accessToken = response.headers.get("Authorization");
        localStorage.setItem("accessToken", accessToken);
      }
      return response.data;
    })
    .catch((err) => err.response.data);
  return {
    type: AUTH_USER,
    payload: request,
  };
}
