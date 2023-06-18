/* 
(2) Action Creator
: Dispatch라는 열차에 Action을 태워서 보내줄 때 
  Dispatch에 inline으로 action을 넣는 것이 불편하기 때문에 action객체를 return 해주는 함수를 만들어놓는 것 (즉, Action을 return 해주는 함수)
*/

import { SIGNUP_USER, LOGIN_USER, LOGOUT_USER, AUTH_USER } from "./type";
import { authRequest, baseRequest } from "../api/common";

export function signup(dataToSubmit) {
  const request = baseRequest()
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
  const request = baseRequest()
    .post("/api/auth/login", dataToSubmit)
    .then((response) => response.data)
    .catch((err) => {
      console.log(err.response.data);
      return err.response.data;
    });
  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function logout() {
  const request = baseRequest()
    .get("/api/auth/logout")
    .then((response) => {
      localStorage.removeItem("accessToken");
      return response.data;
    })
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
  const request = authRequest()
    .get("/api/auth/check")
    .then((response) => {
      console.log(response.data);
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

export function connectWallet() {
  const request = authRequest()
    .post()
    .then((response) => response.data)
    .catch((err) => {
      console.log(err.response);
      return err.response.data;
    });
  return {
    type: "",
    payload: request,
  };
}
