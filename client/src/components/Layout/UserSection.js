import React, { useState, Fragment } from "react";
import Badge from "@mui/material/Badge";
import classes from "../../styles/UserAuth.module.css";
import MyWallet from "./MyWallet";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../_actions/userAction";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";

import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import TelegramIcon from "@mui/icons-material/Telegram";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";

const UserSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogoutHandler = () => {
    dispatch(logout()).then((response) => {
      alert("로그아웃 되었습니다.");
      navigate("/");
    });
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>내 정보</MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <MyWallet />
      </MenuItem>
      <MenuItem
        className={classes.logout}
        onClick={onLogoutHandler}
        sx={{ borderTop: 2 }}
      >
        로그아웃
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size='large' aria-label='show 4 new mails' color='primary'>
          <Badge badgeContent={4} color='error'>
            <TelegramIcon />
          </Badge>
        </IconButton>
        <p>채팅</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size='large'
          aria-label='show 17 new notifications'
          color='primary'
        >
          <Badge badgeContent={17} color='error'>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>찜 목록</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size='large'
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='primary'
        >
          <AccountCircle />
        </IconButton>
        <p>내 정보</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size='large'
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='primary'
        >
          <AccountCircle />
        </IconButton>
        <p>내 지갑</p>
      </MenuItem>
      <MenuItem onClick={onLogoutHandler} sx={{ borderTop: 2 }}>
        <IconButton
          size='large'
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='primary'
        >
          <AccountCircle />
        </IconButton>
        <p>로그아웃</p>
      </MenuItem>
    </Menu>
  );
  return (
    <Fragment>
      <Box sx={{ flexGrow: 1, mr: 10 }}>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Tooltip
            title='현재 진행중인 대화'
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            arrow
          >
            <IconButton
              size='large'
              aria-label='show 4 new mails'
              color='primary'
              sx={{ mr: 2 }}
            >
              <Badge badgeContent={4} color='error'>
                <TelegramIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip
            title='찜 목록'
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            arrow
          >
            <IconButton
              size='large'
              aria-label='show 17 new notifications'
              color='primary'
              sx={{ mr: 2 }}
            >
              <Badge badgeContent={17} color='error'>
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <IconButton
            size='large'
            edge='end'
            aria-label='account of current user'
            aria-controls={menuId}
            aria-haspopup='true'
            onClick={handleProfileMenuOpen}
            color='primary'
          >
            <AccountCircle />
          </IconButton>
        </Box>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size='large'
            aria-label='show more'
            aria-controls={mobileMenuId}
            aria-haspopup='true'
            onClick={handleMobileMenuOpen}
            color='primary'
          >
            <MoreIcon />
          </IconButton>
        </Box>
        {renderMobileMenu}
        {renderMenu}
      </Box>
    </Fragment>
  );
};

export default UserSection;
