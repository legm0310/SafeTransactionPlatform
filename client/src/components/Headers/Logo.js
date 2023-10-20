// Logo.js
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import classes from "../../styles/headers/Logo.module.css";
import { Typography } from "@mui/material";

const Logo = () => {
  return (
    <Fragment>
      <Typography
        variant="h4"
        noWrap
        sx={{
          display: { xs: "none", md: "flex" },
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

      <Typography
        className={classes.logoWrap}
        variant="h5"
        noWrap
        sx={{
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
          fontWeight: 700,
          letterSpacing: ".2rem",
          color: "black",
          textDecoration: "none",
          fontFamily: "GongGothicMedium",
          ml: 1,
        }}
      >
        PANDA.
      </Typography>
    </Fragment>
  );
};

export default Logo;
