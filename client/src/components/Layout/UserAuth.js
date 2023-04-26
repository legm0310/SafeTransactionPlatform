import { Fragment } from "react";
import classes from "./UserAuth.module.css";

const UserAuth = (props) => {
  return (
    <Fragment>
      <ul className={classes.Authwrap}>
        <li className={classes.login}>로그인/</li>
        <li className={classes.register}>회원가입</li>
      </ul>
    </Fragment>
  );
};

export default UserAuth;
