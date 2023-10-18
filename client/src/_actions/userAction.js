/* 
(2) Action Creator
: Dispatch라는 열차에 Action을 태워서 보내줄 때 
  Dispatch에 inline으로 action을 넣는 것이 불편하기 때문에 action객체를 return 해주는 함수를 만들어놓는 것 (즉, Action을 return 해주는 함수)
*/

import {
  GET_USER,
  RESET_STORE_USER,
  SIGNUP_USER,
  LOGIN_USER,
  LOGOUT_USER,
  AUTH_USER,
  UPDATE_USER,
  ADD_WISHLIST,
  GET_WISHLIST,
  DELETE_WISHLIST,
  GET_INIT_USER,
} from "./type";
import { authRequest, baseRequest } from "../api/common";
import { setLoadings } from "./uiAction";

export function resetStoreUser() {
  return {
    type: RESET_STORE_USER,
  };
}

export function getUser(dataToSubmit) {
  const params = dataToSubmit;
  const request = authRequest()
    .get(`/api/user/${params}`)
    .then((response) => response.data)
    .catch((err) => {
      console.log(err.response);
      return err.response.data;
    });
  return {
    type: GET_USER,
    payload: request,
  };
}

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
  const options = { withCredentials: true };
  const request = baseRequest()
    .post("/api/auth/login", dataToSubmit, options)
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
    .then((response) => response.data)
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

export function updateUser(id, dataToSubmit) {
  return async (dispatch) => {
    try {
      console.log(dataToSubmit);
      const res = await authRequest().put(
        `/api/user/userName/${id}`,
        dataToSubmit
      );
      console.log("res", res);
      return dispatch({
        type: UPDATE_USER,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
      return dispatch({
        type: UPDATE_USER,
        payload: err.response.data,
      });
    }
  };
}

export function addWishList(dataToSubmit) {
  return async (dispatch) => {
    try {
      const res = await authRequest().post("/api/user/wishlist", dataToSubmit);
      console.log("res", res);
      // dispatch(setLoadings({ isLoading: false }));
      return dispatch({
        type: ADD_WISHLIST,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
      return dispatch({
        type: ADD_WISHLIST,
        payload: err.response.data,
      });
    }
  };
}

export function getWishList(dataToSubmit) {
  const params = dataToSubmit;
  const request = authRequest()
    .get(`/api/user/wishlist/${params}`)
    .then((response) => response.data)
    .catch((err) => {
      console.log(err.response);
      return err.response.data;
    });
  return {
    type: GET_WISHLIST,
    payload: request,
  };
}

export function deleteWishList(dataToSubmit) {
  const params = dataToSubmit;
  const request = authRequest()
    .delete(`/api/user/wishlist/${params}`)
    .then((response) => response.data)
    .catch((err) => {
      console.log(err.response);
      return err.response.data;
    });
  return {
    type: DELETE_WISHLIST,
    payload: request,
  };
}

export function getInitUser() {
  const request = authRequest()
    .get(`/api/user/init`)
    .then((response) => response.data)
    .catch((err) => {
      console.log(err.response);
      return err.response.data;
    });
  return {
    type: GET_INIT_USER,
    payload: request,
  };
}
