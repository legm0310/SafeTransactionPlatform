// Logo.js
import React, { Fragment } from "react";
import Typography from "@mui/material/Typography";

const Logo = () => {
  return (
    <Fragment>
      <Typography
        variant='h4'
        noWrap
        component='a'
        href='/'
        sx={{
          mr: 2,
          ml: 11,
          display: { xs: "none", md: "flex" },
          fontWeight: 700,
          letterSpacing: ".2rem",
          color: "black",
          textDecoration: "none",
        }}
      >
        PANDA.
      </Typography>
      <Typography
        variant='h5'
        noWrap
        component='a'
        href=''
        sx={{
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
          fontWeight: 700,
          letterSpacing: ".2rem",
          color: "black",
          textDecoration: "none",
        }}
      >
        PANDA.
      </Typography>
    </Fragment>
  );
};

export default Logo;
