import { Fragment } from "react";
import classes from "./UserAuth.module.css";

const UserAuth = (props) => {
  return (
    <Fragment>
      <li className={classes.login}>로그인</li>
      <li className={classes.register}>회원가입</li>
    </Fragment>
  );
};

export default UserAuth;
