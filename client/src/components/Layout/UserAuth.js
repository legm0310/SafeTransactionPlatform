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
      <div className={classes.Authwrap}>
        {isLoggedIn ? (
          <div>
            <div> 내 지갑 관리 </div>
            <div className={classes.logout} onClick={onLogoutHandler}>
              로그아웃
            </div>
          </div>
        ) : (
          <Link to='/login' className={classes.loginRegister}>
            <div className={classes.login}>로그인/</div>
            <div className={classes.register}>회원가입</div>
          </Link>
        )}
      </div>
    </Fragment>
  );
};

export default UserAuth;
