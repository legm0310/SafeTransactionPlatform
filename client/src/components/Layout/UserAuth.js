import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../_actions/userAction";

import classes from "./UserAuth.module.css";

const UserAuth = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogoutHandler = () => {
    dispatch(logout()).then((response) => {
      alert("로그아웃 되었습니다.");
      props.setIsLoggedIn(false);
      navigate("/");
      // 로그아웃에 성공했으므로 isLoggedIn 상태를 false로 변경
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
          <Link to="/login" className={classes.loginRegister}>
            <li className={classes.login}>로그인/</li>
            <li className={classes.register}>회원가입</li>
          </Link>
        )}
      </ul>
    </Fragment>
  );
};

export default UserAuth;
