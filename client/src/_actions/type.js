/* 
(1) Action 
: 중앙 저장소에 저장된 state에 “무슨” 동작을 할 것이지 적어놓는 객체
  action에는 type이 필수로 필요
  type을 직접 처럼 선언하거나, 모듈로 저장
*/

// 각 reducer의 리셋타입
export const RESET_STORE_USER = "resetStoreUser";
export const RESET_STORE_PRODUCT = "resetStoreProduct";
export const RESET_STORE_CHAT = "resetStoreChat";
export const RESET_STORE_UI = "resetStoreUi";

// action의 type들만 관리 (action의 type를 정의)
//user
export const GET_USER = "getUser";
export const SIGNUP_USER = "signup";
export const LOGIN_USER = "login";
export const LOGOUT_USER = "logout";
export const AUTH_USER = "auth";
export const ADD_WISHLIST = "addWishList";
export const GET_WISHLIST = "getWishList";
export const DELETE_WISHLIST = "deleteWishList";
export const UPDATE_USER = "updateUser";
export const GET_INIT_USER = "GET_INIT_USER";

//product
export const ADD_PRODUCT = "addProduct";
export const DEPOSITED_PRODUCTS = "depositedProducts";
export const GET_PRODUCTS = "getProducts";
export const RECENT_PRODUCTS = "recentProducts";
export const GET_PRODUCT = "getProduct";
export const DEPOSIT = "deposit";
export const RELEASE = "release";
export const SEARCH_RECENT_PRODUCTS = "getSearchRecentProducts";
//ui
export const SET_LOADINGS = "setLoadings";
export const SET_CONTRACT_LOADING = "setContractLoading";
//chat
export const SOCKET_INIT = "socketInit";
export const ADD_ROOM = "addRoom";
export const GET_ROOMS = "getRooms";
export const DELETE_ROOM = "deleteRoom";
export const ADD_CHAT = "addChat";
export const GET_CHATS = "getChats";
export const UPDATE_RECENT_CHATS = "updateRecentChats";
export const LOAD_MORE_CHATS = "loadMoreChat";
// export const GET_UNREAD_CHATS = "getUnreadChats";
