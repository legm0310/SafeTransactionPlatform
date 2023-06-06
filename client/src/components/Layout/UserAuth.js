import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserSection from "./UserSection";
import classes from "../../styles/UserAuth.module.css";

const UserAuth = (props) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <div>
      <div className={classes.Authwrap}>
        {isLoggedIn ? (
          <UserSection />
        ) : (
          <Link to='/login' className={classes.loginRegister}>
            <div className={classes.login}>로그인/</div>
            <div className={classes.register}>회원가입</div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default UserAuth;
