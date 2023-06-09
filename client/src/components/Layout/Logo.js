// Logo.js
import React, { Fragment } from "react";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import classes from "../../styles/Logo.module.css";

const Logo = () => {
  return (
    <Fragment>
      <Link to="/" className={classes.logoWrap}>
        <h1 className={classes.logo}>PANDA.</h1>
      </Link>

      <Typography
        variant="h5"
        noWrap
        component="a"
        sx={{
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
          fontWeight: 700,
          letterSpacing: ".2rem",
          color: "black",
          textDecoration: "none",
          fontFamily: "GongGothicMedium",
        }}
      >
        PANDA.
      </Typography>
    </Fragment>
  );
};

export default Logo;
