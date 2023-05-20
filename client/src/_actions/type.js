/* 
(1) Action 
: 중앙 저장소에 저장된 state에 “무슨” 동작을 할 것이지 적어놓는 객체
  action에는 type이 필수로 필요
  type을 직접 처럼 선언하거나, 모듈로 저장
*/

// action의 type들만 관리 (action의 type를 정의)
export const SIGNUP_USER = "signup_user";
export const LOGIN_USER = "login_user";
export const LOGOUT_USER = "logout_user";
export const AUTH_USER = "auth_user";
