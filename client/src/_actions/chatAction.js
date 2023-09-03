import { ADD_ROOM, GET_ROOM } from "./type";
import { setLoadings } from "./uiAction";
import { addProdRequest } from "../api/productApi";
import { baseRequest } from "../api/common";

export function addRoom(dataToSubmit) {
  return async (dispatch) => {
    try {
      const res = await addProdRequest().post("/api/chats", dataToSubmit);
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
        payload: err.reponse.data,
      });
    }
  };
}

export function getRoom(dataToSubmit) {
  const params = { ...dataToSubmit };
  console.log(params);
  const request = baseRequest({ params })
    .get(`/api/chats`)
    .then((response) => response.data)
    .catch((err) => {
      console.log(err);
      return err.response.data;
    });

  return {
    type: GET_ROOM,
    payload: request,
  };
}
