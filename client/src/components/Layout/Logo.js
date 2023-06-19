// Logo.js
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import classes from "../../styles/Logo.module.css";
import { Typography } from "@mui/material";

const Logo = () => {
  return (
    <Fragment>
      {/* <Link to="/" className={classes.logoWrap}>
        <h1 className={classes.logo}>PANDA.</h1>
      </Link> */}

      <Link to='/' className={classes.logoWrap}>
        <Typography
          variant='h5'
          noWrap
          component='a'
          sx={{
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            fontWeight: 700,
            letterSpacing: ".2rem",
            color: "black",
            textDecoration: "none",
            fontFamily: "GongGothicMedium",
            mx: "auto",
          }}
        >
          PANDA.
        </Typography>
        <Typography
          variant='h4'
          noWrap
          component='a'
          sx={{
            display: { xs: "none", md: "block" },
            flexGrow: 1,
            fontWeight: 700,
            letterSpacing: ".2rem",
            color: "black",
            textDecoration: "none",
            fontFamily: "GongGothicMedium",
            mr: 3,
          }}
        >
          PANDA.
        </Typography>
      </Link>
    </Fragment>
  );
};

export default Logo;
