import { SET_LOADINGS } from "./type";

export function setLoadings(state) {
  return {
    type: SET_LOADINGS,
    payload: state,
  };
}
