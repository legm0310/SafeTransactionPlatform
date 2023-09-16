import { ADD_MESSAGE, ADD_ROOM, GET_ROOM } from "../_actions/type";

const initialState = {};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_ROOM:
      return { ...state, addRoomSuccess: action.payload };
      break;
    case GET_ROOM:
      return { ...state, getRoomSuccess: action.payload };
      break;
    case ADD_MESSAGE:
      return { ...state, addMessageSuccess: action.payload };
      break;

    default:
      return state;
  }
}
