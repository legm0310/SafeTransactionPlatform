import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../_actions/userAction";

import classes from "./UserAuth.module.css";

const UserAuth = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const onLogoutHandler = () => {
    dispatch(logout()).then((response) => {
      alert("로그아웃 되었습니다.");
      navigate("/");
    });
  };

  return (
    <Fragment>
      <ul className={classes.Authwrap}>
        {isLoggedIn ? (
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
