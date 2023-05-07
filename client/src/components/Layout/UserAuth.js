import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./UserAuth.module.css";

const navigate = useNavigate();

const onLogoutHandler = () => {
  axios.get(`/api/auth/logout`).then((response) => {
    if (response.data.success) {
      // localStorage 지우기
      localStorage.clear();

      // 쿠키 지우기
      document.cookie =
        "쿠키이름=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      navigate("/");
    } else {
      alert("로그아웃에 실패 했습니다.");
    }
  });
};

const isLoggedIn = true;

const UserAuth = (props) => {
  return (
    <Fragment>
      <ul className={classes.Authwrap}>
        {isLoggedIn ? (
          <li className={classes.logout} onClick={onLogoutHandler}>
            로그아웃
          </li>
        ) : (
          <Link to="/Login" className={classes.link}>
            <li className={classes.login}>로그인/</li>
            <li className={classes.register}>회원가입</li>
          </Link>
        )}
      </ul>
    </Fragment>
  );
};

export default UserAuth;
