import { ADD_ROOM } from "./type";
import { setLoadings } from "./uiAction";
import { addProdRequest } from "../api/productApi";

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
