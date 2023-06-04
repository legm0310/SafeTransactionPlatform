import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import classes from "./Header.module.css";
import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";

const DesktopNavMenu = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  return (
    <Fragment>
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "none", md: "flex" },
          alignItems: "center",
        }}
      >
        <Link to='/products/all' className={classes.purchaseLink}>
          <Button
            onClick={handleCloseNavMenu}
            sx={{ my: 2, color: "black", fontWeight: 700 }}
          >
            구매하기
          </Button>
        </Link>
        <Link to='/products/add' className={classes.purchaseLink}>
          <Button
            onClick={handleCloseNavMenu}
            sx={{ my: 2, color: "black", fontWeight: 700 }}
          >
            판매하기
          </Button>
        </Link>
        <Paper
          component='form'
          sx={{
            p: "2px 4px",
            ml: 3,
            display: "flex",
            alignItems: "center",
            width: 400,
            borderRadius: 5,
            height: 37,
            justifyContent: "center",
            border: 1.5,
            display: { xs: "none", md: "flex" },
          }}
        >
          <InputBase
            sx={{ ml: 2, flex: 1 }}
            placeholder='검색어를 입력하세요...'
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type='button' sx={{ p: "10px" }} aria-label='search'>
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
    </Fragment>
  );
};

export default DesktopNavMenu;
