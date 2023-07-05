import { combineReducers } from "redux";
import uiReducer from "./uiReducer";
import userReducer from "./userReducer";
import productReducer from "./productReducer";
import chatReducer from "./chatReducer";
const rootReducer = combineReducers({
  ui: uiReducer,
  user: userReducer,
  product: productReducer,
  chat: chatReducer,
});

export default rootReducer;
