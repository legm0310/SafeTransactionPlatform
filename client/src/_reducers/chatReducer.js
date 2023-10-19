import {
  SOCKET_INIT,
  RESET_STORE_CHAT,
  ADD_CHAT,
  ADD_ROOM,
  GET_ROOMS,
  GET_CHATS,
  DELETE_ROOM,
  UPDATE_RECENT_CHATS,
  LOAD_MORE_CHATS,
  GET_INIT_USER,
  READ_CHATS,
} from "../_actions/type";

const initialState = {
  rooms: [],
  chats: [],
  roomInfo: {},
  hasMoreChatLoad: true,
  socket: null,
  unreadTotalCount: 0,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case RESET_STORE_CHAT:
      return initialState;
      break;

    case SOCKET_INIT:
      return { ...state, socket: action.payload };

    case ADD_ROOM: {
      state.rooms =
        action.payload.results == "createdRoom" ||
        action.payload.results == "updatedRoom"
          ? [action.payload.room, ...state.rooms]
          : [...state.rooms];
      return {
        ...state,
        addRoomSuccess: action.payload.addRoomSuccess,
      };
      break;
    }

    case GET_ROOMS: {
      const updatedRooms = action.payload.rooms?.sort((a, b) => {
        if (a.chat_logs?.length === 0 || b.chat_logs?.length === 0) return 1;
        return (
          new Date(b.chat_logs[0].createdAt).getTime() -
          new Date(a.chat_logs[0].createdAt).getTime()
        );
      });
      return {
        ...state,
        getRoomsSuccess: action.payload.getRoomsSuccess,
        rooms: updatedRooms,
      };
      break;
    }
    case DELETE_ROOM:
      return {
        ...state,
        rooms: [
          ...state.rooms.filter(
            (room) => room.id !== action.payload.deletedRoom
          ),
        ],
      };
      break;

    case ADD_CHAT:
      return {
        ...state,
        chats: [...state.chats, action.payload],
      };
      break;

    case GET_CHATS:
      return {
        ...state,
        getChatsSuccess: action.payload.getChatsSuccess,
        roomInfo: action.payload.roomInfo,
        chats: Array.isArray(action.payload.chats) ? action.payload.chats : [],
        hasMoreChatLoad: action.payload.chats?.length == 20 ? true : false,
      };
      break;

    case UPDATE_RECENT_CHATS: {
      console.log(action.payload);
      const updatedRooms = state.rooms?.map((room) =>
        room.id == action.payload.roomId
          ? {
              ...room,
              unreadCount:
                action.payload.checkRead == false &&
                action.payload.oneSelf == false
                  ? room.unreadCount + 1
                  : room.unreadCount,
              chat_logs: [
                { content: action.payload.chat, createdAt: new Date() },
              ],
            }
          : room
      );
      const sortedRooms = updatedRooms.sort((a, b) => {
        if (a.chat_logs.length === 0 || b.chat_logs.length === 0) return 1;
        return (
          new Date(b.chat_logs[0].createdAt).getTime() -
          new Date(a.chat_logs[0].createdAt).getTime()
        );
      });
      return {
        ...state,
        rooms: sortedRooms,
      };
    }

    case LOAD_MORE_CHATS:
      return {
        ...state,
        chats: [...action.payload.chats, ...state.chats],
        hasMoreChatLoad: action.payload.chats.length === 20 ? true : false,
      };
      break;
    case GET_INIT_USER:
      return {
        ...state,
        unreadTotalCount: action.payload.unreadCount,
      };
      break;
    default:
      return state;
  }
}
