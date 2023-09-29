import {
  ADD_MESSAGE,
  ADD_ROOM,
  GET_ROOMS,
  GET_CHATS,
  DELETE_ROOM,
} from "../_actions/type";

const initialState = {
  rooms: [],
  chats: [],
  roomInfo: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case RESET_STORE_CHAT:
      return initialState;
      break;
    case ADD_ROOM:
      return { ...state, addRoomSuccess: action.payload };
      break;
    case ADD_CHAT:
      return { ...state, addChatSuccess: action.payload };
      break;
    case GET_ROOMS:
      return {
        ...state,
        getRoomsSuccess: action.payload.getRoomsSuccess,
        rooms: action.payload.rooms,
      };
      break;
    case GET_CHATS:
      return { ...state, getChatsSuccess: action.payload };
      break;
    case DELETE_ROOM:
      return { ...state, DeleteRoomSuccess: action.payload };
      break;
    case ADD_MESSAGE:
      return { ...state, addMessageSuccess: action.payload };
      break;
    default:
      return state;
  }
}
