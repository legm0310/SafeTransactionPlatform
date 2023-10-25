import React, { useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Box,
  IconButton,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { logout, resetStoreUser } from "../../_actions/userAction";
import { resetStoreProduct } from "../../_actions/productAction";
import { resetStoreChat } from "../../_actions/chatAction";
import { resetStoreUi } from "../../_actions/uiAction";
import { useDisconnect } from "@thirdweb-dev/react";
import { useSnackbar } from "notistack";
import MyWallet from "./MyWallet";

import classes from "../../styles/headers/Header.module.css";

const MobileNavMenu = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId, loadWishList, authCheck, isLoggedIn } = useSelector(
    (state) => state.user
  );

  const { enqueueSnackbar } = useSnackbar();

  const disconnect = useDisconnect();

  const onLogoutHandler = () => {
    dispatch(logout()).then((response) => {
      dispatch(resetStoreUi());
      dispatch(resetStoreUser());
      dispatch(resetStoreProduct());
      dispatch(resetStoreChat());
      enqueueSnackbar("로그아웃 되었습니다.", {
        variant: "success",
      });
      disconnect();
      navigate("/");
    });
  };
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [openWallet, setOpenWallet] = useState(false);

  const handleOpenDrawer = () => {
    setDrawerIsOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerIsOpen(false);
  };

  const handleOpenWallet = () => {
    setOpenWallet(true);
  };

  const handleCloseWallet = () => {
    setOpenWallet(false);
  };

  const onChattingOpen = () => {
    navigate("/chat");
  };

  const onWishListOpen = () => {
    navigate(`/user/${userId}`, {
      state: {
        activeMenu: "WishList",
      },
    });
  };

  return (
    <Fragment>
      <Box
        sx={{
          display: { md: "flex", lg: "none" },
          position: { xs: "absolute" },
          right: { xs: 0 },
        }}
      >
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="mobile-nav-menu"
          aria-haspopup="true"
          onClick={handleOpenDrawer}
          color="black"
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          anchor="right"
          open={drawerIsOpen}
          onClose={handleCloseDrawer}
          sx={{
            display: {
              xs: "block",
              lg: "none",
              fontFamily: "GongGothicMedium",
            },
          }}
        >
          <List
            sx={{
              padding: 0,
              width: { sm: "300px", xs: "250px" },
              height: "100%",
            }}
          >
            <Link to={`/user/${userId}`}>
              <ListItem>
                {isLoggedIn ? (
                  <ListItemButton sx={{ height: 100, borderRadius: "5px" }}>
                    {authCheck?.userData?.user_name.length > 3
                      ? `${authCheck.userData?.user_name.slice(0, 2)}..`
                      : authCheck?.userData?.user_name}{" "}
                    님
                  </ListItemButton>
                ) : (
                  <Link to="/login" className={classes.loginRegister}>
                    <ListItemButton sx={{ height: 100, borderRadius: "5px" }}>
                      로그인/회원가입
                    </ListItemButton>
                  </Link>
                )}
              </ListItem>
            </Link>
            <Link to="/products/all" className={classes.purchaseLink}>
              <ListItem
                sx={{
                  borderTop: "1px solid rgb(238, 238, 238)",
                  borderRadius: "5px",
                }}
              >
                <ListItemButton>구매하기</ListItemButton>
              </ListItem>
            </Link>
            <Link to="/products/add" className={classes.purchaseLink}>
              <ListItem
                sx={{
                  borderRadius: "5px",
                }}
              >
                <ListItemButton>판매하기</ListItemButton>
              </ListItem>
            </Link>
            {isLoggedIn ? (
              <ListItem onClick={onChattingOpen}>
                <ListItemButton>판다톡</ListItemButton>
              </ListItem>
            ) : null}

            {isLoggedIn ? (
              <ListItem onClick={onWishListOpen}>
                <ListItemButton>찜목록</ListItemButton>
              </ListItem>
            ) : null}

            {isLoggedIn ? (
              <ListItem onClick={handleOpenWallet}>
                <ListItemButton>내지갑</ListItemButton>
              </ListItem>
            ) : null}
            <ListItem
              onClick={onLogoutHandler}
              sx={{ position: "absolute", bottom: 0 }}
            >
              {isLoggedIn ? (
                <Link to="/">
                  <ListItemButton sx={{ color: "gray", fontSize: "13px" }}>
                    로그아웃
                  </ListItemButton>
                </Link>
              ) : null}
            </ListItem>
          </List>
        </Drawer>
      </Box>
      <MyWallet open={openWallet} onClose={handleCloseWallet} />
    </Fragment>
  );
};

export default MobileNavMenu;
