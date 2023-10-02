import {
  SOCKET_INIT,
  RESET_STORE_CHAT,
  ADD_ROOM,
  ADD_CHAT,
  GET_ROOMS,
  GET_CHATS,
  UPDATE_RECENT_CHATS,
  LOAD_MORE_CHATS,
  RESET_CURRENT_CHATS,
} from "./type";
import { setLoadings } from "./uiAction";
import { addProdRequest } from "../api/productApi";
import { baseRequest, authRequest } from "../api/common";

export function socketInit(dataToSubmit) {
  return {
    type: SOCKET_INIT,
    payload: dataToSubmit,
  };
}

export function resetStoreChat() {
  return {
    type: RESET_STORE_CHAT,
  };
}
export function addRoom(dataToSubmit) {
  return async (dispatch) => {
    try {
      const res = await authRequest().post("/api/chats", dataToSubmit);
      console.log("res", res);
      dispatch(setLoadings({ isLoading: false }));
      return dispatch({
        type: ADD_ROOM,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
      return dispatch({
        type: ADD_ROOM,
        payload: err.response.data,
      });
    }
  };
}

export function getRooms() {
  return async (dispatch) => {
    dispatch(setLoadings({ isChatPageLoading: true }));
    try {
      const res = await authRequest().get(`/api/chat`);
      console.log("res", res);
      return dispatch({
        type: GET_ROOMS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
      return dispatch({
        type: GET_ROOMS,
        payload: err.response ? err.response.data : err,
      });
    } finally {
      dispatch(setLoadings({ isChatPageLoading: false }));
    }
  };
}
// export function deleteRoom() {
//   const request = authRequest()
//     .delete(`/api/chat/:id`)
//     .then((response) => response.data)
//     .catch((err) => {
//       console.log(err);
//       return err.response.data;
//     });
//   return {
//     type: DELETE_ROOM,
//     payload: request,
//   };
// }

// export function deleteRoom() {
//   return async (dispatch) => {
//     try {
//     } catch {
//     } finally {
//     }
//   };
// }

export function addChat(dataToSubmit) {
  console.log(dataToSubmit);
  return {
    type: ADD_CHAT,
    payload: dataToSubmit,
  };
}

export function addChat(dataToSubmit) {
  console.log(dataToSubmit);
  return {
    type: ADD_CHAT,
    payload: dataToSubmit,
  };
}

export function getChats(dataToSubmit) {
  const { roomId, lastId, limit } = dataToSubmit;
  const params = { lastId, limit };
  return async (dispatch) => {
    dispatch(setLoadings({ isChatLoading: true }));
    try {
      const res = await authRequest({ params }).get(`/api/chat/${roomId}`);
      console.log("res", res);
      return dispatch({
        type: GET_CHATS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
      return dispatch({
        type: GET_CHATS,
        payload: err.response ? err.response.data : err,
      });
    } finally {
      dispatch(setLoadings({ isChatLoading: false }));
    }
  };
}

export function updateRecentChats(dataToSubmit) {
  const { roomId, chat } = dataToSubmit;
  return async (dispatch) => {
    dispatch({
      type: UPDATE_RECENT_CHATS,
      payload: { roomId, chat },
    });
  };
}

export function resetCurrentChats() {
  return async (dispatch) => {
    return dispatch({
      type: RESET_CURRENT_CHATS,
    });
  };
}
