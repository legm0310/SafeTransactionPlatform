import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import classes from "./UserAuth.module.css";

const UserAuth = (props) => {
  const navigate = useNavigate();

  const onLogoutHandler = () => {
    axios.defaults.withCredentials = true;
    axios
      .get("/api/auth/logout", {
        // 'withCredentials'속성을 'true'로 설정하여 요청을 보낼 때 쿠키에 토큰을 추가
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.logoutSuccess) {
          // localStorage 지우기
          localStorage.clear();

          alert("로그아웃 되었습니다.");
          props.setIsLoggedIn(false);
          navigate("/");
          // 로그아웃에 성공했으므로 isLoggedIn 상태를 false로 변경
        } else {
          alert("로그아웃에 실패 했습니다.");
        }
      });
  };

  return (
    <Fragment>
      <ul className={classes.Authwrap}>
        {props.isLoggedIn ? (
          <li className={classes.logout} onClick={onLogoutHandler}>
            로그아웃
          </li>
        ) : (
          <Link to="/Login" className={classes.loginRegister}>
            <li className={classes.login}>로그인/</li>
            <li className={classes.register}>회원가입</li>
          </Link>
        )}
      </ul>
    </Fragment>
  );
};

export default UserAuth;
