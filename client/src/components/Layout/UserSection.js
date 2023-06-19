import React, { useState, Fragment } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../_actions/userAction";
import { ConnectWallet } from "@thirdweb-dev/react";
import MyWallet from "./MyWallet";

import classes from "../../styles/UserSection.module.css";
import {
  Badge,
  Box,
  IconButton,
  MenuItem,
  Menu,
  Tooltip,
  Fade,
  Typography,
  Button,
} from "@mui/material";
import {
  AccountCircle,
  Notifications as NotificationsIcon,
  MoreVert as MoreIcon,
  Telegram as TelegramIcon,
  Favorite as FavoriteIcon,
  WalletRounded as WalletRoundedIcon,
} from "@mui/icons-material";

const UserSection = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogoutHandler = () => {
    dispatch(logout()).then((response) => {
      alert("로그아웃 되었습니다.");
      navigate("/");
    });
  };

  const [openWallet, setOpenWallet] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleOpenWallet = () => {
    setOpenWallet(true);
  };

  const handleCloseWallet = () => {
    setOpenWallet(false);
  };

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
      <Link to='/userinfo'>
        <MenuItem onClick={onMenuClose} sx={{ color: "black" }}>
          <AccountCircle sx={{ fontSize: 20, mr: "4px", color: "#1ecfba" }} />내
          정보
        </MenuItem>
      </Link>

      <MenuItem sx={{ color: "black" }}>
        <FavoriteIcon sx={{ fontSize: 20, mr: "4px", color: "#1ecfba" }} />
        <Typography>찜목록</Typography>
      </MenuItem>

      <MenuItem
        className={classes.logout}
        onClick={onLogoutHandler}
        sx={{ borderTop: "2px solid gray", paddingBottom: 0 }}
      >
        <Typography sx={{ mx: "auto" }}>로그아웃</Typography>
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

      <MenuItem onClick={handleOpenWallet} onClose={onMobileMenuClose}>
        <IconButton
          size='large'
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='primary'
        >
          <WalletRoundedIcon sx={{ color: "#1ecfba" }} />
        </IconButton>
        <p>내지갑</p>
      </MenuItem>
      <MyWallet open={openWallet} onClose={handleCloseWallet} />

      <MenuItem onClick={onProfileMenuOpen}>
        <IconButton
          size='large'
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='primary'
        >
          <AccountCircle />
        </IconButton>
        <p>내정보</p>
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
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Tooltip
            title='현재 진행중인 대화'
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            arrow
          >
            <Link to={`/chat/`} className={classes.linkButton}>
              <Button
                sx={{
                  mr: 2,
                  color: "black",
                  fontWeight: 700,
                  fontFamily: "GongGothicMedium",
                }}
                variant='text'
              >
                <TelegramIcon
                  sx={{ fontSize: 20, mr: "4px", color: "#CF541D" }}
                />
                <Typography>판다톡</Typography>
              </Button>
            </Link>
          </Tooltip>

          <Tooltip
            title='찜 목록'
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            arrow
          >
            <Link to={""} className={classes.linkButton}>
              <Button
                sx={{
                  mr: 2,
                  color: "black",
                  fontWeight: 700,
                  fontFamily: "GongGothicMedium",
                }}
              >
                <FavoriteIcon
                  sx={{ fontSize: 20, mr: "4px", color: "#1ecfba" }}
                />
                <Typography>찜목록</Typography>
              </Button>
            </Link>
          </Tooltip>

          <Button
            sx={{
              mr: 1,
              color: "black",
              fontWeight: 700,
              fontFamily: "GongGothicMedium",
            }}
            variant='text'
            onClick={handleOpenWallet}
          >
            <WalletRoundedIcon
              sx={{ fontSize: 20, color: "#1ecfba", mr: "4px" }}
            />
            <Typography>내지갑</Typography>
          </Button>
          <MyWallet open={openWallet} onClose={handleCloseWallet} />

          <Button
            edge='end'
            aria-controls={menuId}
            aria-haspopup='true'
            onClick={onProfileMenuOpen}
            sx={{
              p: 0,
              color: "black",
              fontWeight: 700,
              fontFamily: "GongGothicMedium",
            }}
          >
            <AccountCircle sx={{ fontSize: 30, color: "#1ecfba" }} />
          </Button>
        </Box>

        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size='large'
            aria-controls={mobileMenuId}
            aria-haspopup='true'
            onClick={handleMobileMenuOpen}
            color='black'
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
