import { combineReducers } from "redux";
import user from "./userReducer";
import product from "./productReducer";

const rootReducer = combineReducers({
  user,
  product,
});

export default rootReducer;
