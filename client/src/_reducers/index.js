import { combineReducers } from "redux";
import uiReducer from "./uiReducer";
import userReducer from "./userReducer";
import productReducer from "./productReducer";

const rootReducer = combineReducers({
  ui: uiReducer,
  user: userReducer,
  product: productReducer,
});

export default rootReducer;
