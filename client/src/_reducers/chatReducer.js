import { ADD_ROOM } from "../_actions/type";

const initialState = {};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_ROOM:
      return { ...state, addRoomSuccess: action.payload };
      break;

    default:
      return state;
  }
}
