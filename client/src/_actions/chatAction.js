import {
  SOCKET_INIT,
  RESET_STORE_CHAT,
  ADD_ROOM,
  ADD_CHAT,
  GET_ROOMS,
  GET_CHATS,
  DELETE_ROOM,
  UPDATE_RECENT_CHATS,
  LOAD_MORE_CHATS,
  READ_CHATS,
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
  const body = dataToSubmit;
  return async (dispatch) => {
    dispatch(setLoadings({ isLoading: true }));
    try {
      const res = await authRequest().post("/api/chat/room", body);
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
    } finally {
      dispatch(setLoadings({ isLoading: false }));
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

export function deleteRoom(dataToSubmit) {
  const roomId = dataToSubmit;
  return async (dispatch) => {
    dispatch(setLoadings({ isChatLoading: true }));
    try {
      return dispatch({
        type: DELETE_ROOM,
        payload: roomId,
      });
    } catch (err) {
      return dispatch({
        type: DELETE_ROOM,
        payload: err.response ? err.response.data : err,
      });
    } finally {
      dispatch(setLoadings({ isChatLoading: false }));
    }
  };
}

export function addChat(dataToSubmit) {
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
export function loadMoreChats(dataToSubmit) {
  const { roomId, lastId, limit } = dataToSubmit;
  const params = { lastId, limit };
  return async (dispatch) => {
    dispatch(setLoadings({ isChatLoading: true }));
    try {
      const res = await authRequest({ params }).get(`/api/chat/${roomId}`);
      console.log("res", res);
      return dispatch({
        type: LOAD_MORE_CHATS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
      return dispatch({
        type: LOAD_MORE_CHATS,
        payload: err.response ? err.response.data : err,
      });
    } finally {
      dispatch(setLoadings({ isChatLoading: false }));
    }
  };
}

export function updateRecentChats(dataToSubmit) {
  const { oneSelf, roomId, chat, checkRead } = dataToSubmit;
  return async (dispatch) => {
    dispatch({
      type: UPDATE_RECENT_CHATS,
      payload: { oneSelf, roomId, chat, checkRead },
    });
  };
}

export function readChats() {
  return async (dispatch) => {
    dispatch({
      type: 1,
      payload: 1,
    });
  };
}
