import React, { useState, Fragment } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../_actions/userAction";
import { ConnectWallet } from "@thirdweb-dev/react";
import MyWallet from "./MyWallet";
import UserInfo from "../../pages/User/UserInfo";

import classes from "../../styles/UserAuth.module.css";
import {
  Badge,
  Box,
  IconButton,
  MenuItem,
  Menu,
  Tooltip,
  Fade,
  Typography,
} from "@mui/material";
import {
  AccountCircle,
  Notifications as NotificationsIcon,
  MoreVert as MoreIcon,
  Telegram as TelegramIcon,
  Favorite as FavoriteIcon,
  WalletRounded as WalletRoundedIcon,
} from "@mui/icons-material";

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

  const onProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const onMenuClose = () => {
    setAnchorEl(null);
    onMobileMenuClose();
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
      onClose={onMenuClose}
    >
      <Link to="/userinfo">
        <MenuItem onClick={onMenuClose} sx={{ color: "black" }}>
          내 정보
        </MenuItem>
      </Link>

      {/* <MenuItem onClick={onMenuClose}>
        <ConnectWallet theme="white" btnTitle="지갑 연결" />
        <MyWallet />
      </MenuItem>  */}

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
      onClose={onMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="primary">
          <Badge badgeContent={4} color="error">
            <TelegramIcon />
          </Badge>
        </IconButton>
        <p>채팅</p>
      </MenuItem>

      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="primary"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>찜 목록</p>
      </MenuItem>

      <MenuItem onClick={onProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="primary"
        >
          <AccountCircle />
        </IconButton>
        <p>내 정보</p>
      </MenuItem>

      <MenuItem>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="primary"
        ></IconButton>
        <MyWallet />
      </MenuItem>

      <MenuItem onClick={onLogoutHandler} sx={{ borderTop: 2 }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="primary"
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
            title="현재 진행중인 대화"
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            arrow
          >
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="black"
              sx={{ mr: 2 }}
            >
              <Badge badgeContent={4} color="error">
                <TelegramIcon sx={{ fontSize: 30 }} />
              </Badge>
              <Typography>판다톡</Typography>
            </IconButton>
          </Tooltip>

          <Tooltip
            title="찜 목록"
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            arrow
          >
            <IconButton size="large" color="black" sx={{ mr: 2 }}>
              <Badge badgeContent={17} color="error">
                <FavoriteIcon sx={{ fontSize: 30 }} />
              </Badge>
              <Typography>찜목록</Typography>
            </IconButton>
          </Tooltip>

          <IconButton size="large" sx={{ mr: 2 }}>
            <MyWallet />
          </IconButton>

          <IconButton
            size="large"
            edge="end"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={onProfileMenuOpen}
            color="black"
          >
            <AccountCircle sx={{ fontSize: 30 }} />
            <Typography>내정보</Typography>
          </IconButton>
        </Box>

        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="black"
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
