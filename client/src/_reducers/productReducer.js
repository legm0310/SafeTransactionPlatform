/* 
(4) reducer
: dispatch열차를 타고온 action의 type을 확인해서 그에 맞는 동작을 하는 곳
  reducer은 store의 state를 변경시켜야하기 때문에 state를 파라메터로 받고,
  dispatch를 타고온 action을 파라메터로 받아서 
  action의 type을 switch case문으로 조건을 걸어 동작
*/

import {
  RESET_STORE_PRODUCT,
  ADD_PRODUCT,
  DEPOSITED_PRODUCTS,
  RECENT_PRODUCTS,
  GET_PRODUCTS,
  GET_PRODUCT,
  DEPOSIT,
  DEPOSIT_SUCCESS,
  DEPOSIT_FAILURE,
  RELEASE,
  RELEASE_SUCCESS,
  RELEASE_FAILURE,
} from "../_actions/type";

const initialState = {
  productDetail: {},

  depositLoading: false,
  depositDone: null,
  depositError: null,

  releaseLoading: false,
  releaseDone: null,
  releaseError: null,
};

// Action의 type에 따라 변화된 state 반환
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  // 전의 state, 지금의 state
  switch (action.type) {
    case RESET_STORE_PRODUCT:
      return initialState;
      break;
    case ADD_PRODUCT:
      return { ...state, addProductSuccess: action.payload };
      break;
    case DEPOSITED_PRODUCTS:
      return { ...state, depositedProducts: action.payload };
      break;
    case RECENT_PRODUCTS:
      return { ...state, recentProductsSuccess: action.payload };
      break;
    case GET_PRODUCTS:
      return { ...state, searchProducts: action.payload };
      break;
    case GET_PRODUCT:
      return {
        ...state,
        getProductSuccess: action.payload?.getProductSuccess,
        productDetail: action.payload?.product,
      };
      break;
    case DEPOSIT:
      return { ...state, deposit: action.payload };
      break;
    case RELEASE:
      return { ...state, release: action.payload };
      break;
    default: // state가 들어오지 않았을 경우 전의 state를 넣어줌
      return state;
  }
}
