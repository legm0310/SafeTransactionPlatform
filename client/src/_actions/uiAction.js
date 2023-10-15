import { RESET_STORE_UI, SET_LOADINGS } from "./type";

export function resetStoreUi() {
  return {
    type: RESET_STORE_UI,
  };
}

export function setLoadings(state) {
  return {
    type: SET_LOADINGS,
    payload: state,
  };
}
