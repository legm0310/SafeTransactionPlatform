import { SET_LOADINGS } from "../_actions/type";

const initialState = {
  isLoading: false,
  isContractLoading: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_LOADINGS:
      return { ...state, ...action.payload };
      break;
    default:
      return state;
  }
}
