/* 
(4) reducer
: dispatch열차를 타고온 action의 type을 확인해서 그에 맞는 동작을 하는 곳
  reducer은 store의 state를 변경시켜야하기 때문에 state를 파라메터로 받고,
  dispatch를 타고온 action을 파라메터로 받아서 
  action의 type을 switch case문으로 조건을 걸어 동작
*/

import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "../_actions/type";

// Action의 type에 따라 변화된 state 반환
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = {}, action) {
  // 전의 state, 지금의 state
  switch (action.type) {
    case LOGIN_USER:
      // 원본, 서버에서 넘어온 정보를 여기에 넣어준 것
      return { ...state, loginSuccess: action.payload };
      break;
    case REGISTER_USER:
      return { ...state, registerSuccess: action.payload };
      break;
    case AUTH_USER:
      // 모든 유저데이터가 userData에 들어오게 됨
      return { ...state, userData: action.payload };
      break;
    default: // state가 들어오지 않았을 경우 전의 state를 넣어줌
      return state;
  }
}
