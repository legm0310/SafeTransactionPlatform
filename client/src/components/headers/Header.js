import React, { Fragment, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import UserAuth from "./UserAuth";
import MobileNavMenu from "./MobileNavMenu";
import DesktopNavMenu from "./DesktopNavMenu";
import Logo from "./Logo";

import ContractModal from "../common/ContractModal";

import classes from "../../styles/headers/Header.module.css";
import { AppBar, Container, Toolbar } from "@mui/material";

const Header = (props) => {
  const location = useLocation();
  // const isContactLoading = useSelector(state => state.ui.isContactLoading);
  const [anchorElNav, setAnchorElNav] = useState(null);

  // 현재 경로가 로그인 페이지인 경우 Header를 렌더링하지 않음
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Fragment>
      <AppBar position="sticky" sx={{ bgcolor: "white", width: "100vw" }}>
        <Container maxWidth="xl">
          {/* <div
            id="test"
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          > */}
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <MobileNavMenu
              handleOpenNavMenu={handleOpenNavMenu}
              handleCloseNavMenu={handleCloseNavMenu}
              anchorElNav={anchorElNav}
              classes={classes}
            />

            <Link to="/">
              <Logo />
            </Link>

            <DesktopNavMenu classes={classes} />

            <UserAuth
              setIsLoggedIn={props.setIsLoggedIn}
              isLoggedIn={props.isLoggedIn}
            />
          </Toolbar>
        </Container>
      </AppBar>
      <ContractModal />
    </Fragment>
  );
};

export default Header;
