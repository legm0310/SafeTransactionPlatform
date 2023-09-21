import { ADD_MESSAGE, ADD_ROOM, GET_ROOMS, GET_CHATS } from "../_actions/type";

const initialState = {
  rooms: [],
  chats: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_ROOM:
      return { ...state, addRoomSuccess: action.payload };
      break;
    case GET_ROOMS: {
      state.rooms = action.payload.rooms;
      return { ...state, getRoomsSuccess: action.payload.getRoomsSuccess };
      break;
    }
    case GET_CHATS:
      return { ...state, getChatsSuccess: action.payload };
      break;
    case ADD_MESSAGE:
      return { ...state, addMessageSuccess: action.payload };
      break;
    default:
      return state;
  }
}
