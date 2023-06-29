import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";

import classes from "../../styles/headers/UserAuth.module.css";
import { Button } from "@mui/material";

const UserAuth = (props) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <Fragment>
      <div className={classes.Authwrap}>
        {isLoggedIn ? (
          <UserMenu />
        ) : (
          <Link to="/login" className={classes.loginRegister}>
            <Button
              variant="text"
              sx={{
                color: "black",
                fontWeight: 700,
                fontFamily: "GongGothicMedium",
              }}
            >
              로그인/회원가입
            </Button>
          </Link>
        )}
      </div>
    </Fragment>
  );
};

export default UserAuth;
