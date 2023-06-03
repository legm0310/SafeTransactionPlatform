// import React, { Fragment, useState } from "react"
// import { Link, useLocation } from "react-router-dom"

// import classes from "./Header.module.css"
// import { FiSearch } from "react-icons/fi"
// import DropdownMenu from "./DropdownMenu"
// import UserAuth from "./UserAuth"

// import AppBar from "@mui/material/AppBar"
// import Box from "@mui/material/Box"
// import Toolbar from "@mui/material/Toolbar"
// import IconButton from "@mui/material/IconButton"
// import Typography from "@mui/material/Typography"
// import Menu from "@mui/material/Menu"
// import MenuIcon from "@mui/icons-material/Menu"
// import Container from "@mui/material/Container"
// import Button from "@mui/material/Button"
// import MenuItem from "@mui/material/MenuItem"

// const Header = (props) => {
//   const location = useLocation()
//   const [anchorElNav, setAnchorElNav] = useState(null)

//   // 현재 경로가 로그인 페이지인 경우 Header를 렌더링하지 않음
//   if (location.pathname === "/login" || location.pathname === "/register") {
//     return null
//   }

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget)
//   }

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null)
//   }

//   return (
//     <Fragment>
//       <AppBar position='static' sx={{ bgcolor: "white" }}>
//         <Container maxWidth='xl'>
//           <Toolbar disableGutters>
//             <Typography
//               variant='h4'
//               noWrap
//               component='a'
//               href='/'
//               sx={{
//                 mr: 2,
//                 ml: 11,
//                 display: { xs: "none", md: "flex" },
//                 fontWeight: 700,
//                 letterSpacing: ".2rem",
//                 color: "black",
//                 textDecoration: "none",
//               }}
//             >
//               PANDA.
//             </Typography>

//             <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
//               <IconButton
//                 size='large'
//                 aria-label='account of current user'
//                 aria-controls='menu-appbar'
//                 aria-haspopup='true'
//                 onClick={handleOpenNavMenu}
//                 color='black'
//               >
//                 <MenuIcon />
//               </IconButton>
//               <Menu
//                 id='menu-appbar'
//                 anchorEl={anchorElNav}
//                 anchorOrigin={{
//                   vertical: "bottom",
//                   horizontal: "left",
//                 }}
//                 keepMounted
//                 transformOrigin={{
//                   vertical: "top",
//                   horizontal: "left",
//                 }}
//                 open={Boolean(anchorElNav)}
//                 onClose={handleCloseNavMenu}
//                 sx={{
//                   display: { xs: "block", md: "none" },
//                 }}
//               >
//                 <MenuItem onClick={handleCloseNavMenu}>
//                   <Link to='/Product/all' className={classes.purchaseLink}>
//                     구매하기
//                   </Link>
//                 </MenuItem>
//                 <MenuItem onClick={handleCloseNavMenu}>
//                   <Link to='/Product/add' className={classes.purchaseLink}>
//                     판매하기
//                   </Link>
//                 </MenuItem>
//               </Menu>
//             </Box>
//             <Typography
//               variant='h5'
//               noWrap
//               component='a'
//               href=''
//               sx={{
//                 mr: 2,
//                 display: { xs: "flex", md: "none" },
//                 flexGrow: 1,
//                 fontWeight: 700,
//                 letterSpacing: ".2rem",
//                 color: "black",
//                 textDecoration: "none",
//               }}
//             >
//               PANDA.
//             </Typography>
//             <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
//               <Link to='/products/all' className={classes.purchaseLink}>
//                 <Button
//                   onClick={handleCloseNavMenu}
//                   sx={{ my: 2, color: "black", fontWeight: 700 }}
//                 >
//                   구매하기
//                 </Button>
//               </Link>
//               <Link to='/products/add' className={classes.purchaseLink}>
//                 <Button
//                   onClick={handleCloseNavMenu}
//                   sx={{ my: 2, color: "black", fontWeight: 700 }}
//                 >
//                   판매하기
//                 </Button>
//               </Link>
//             </Box>

//             <Box sx={{ flexGrow: 0, mr: { xs: 1, md: 11 } }}>
//               <UserAuth
//                 setIsLoggedIn={props.setIsLoggedIn}
//                 isLoggedIn={props.isLoggedIn}
//               />
//             </Box>
//           </Toolbar>
//         </Container>
//       </AppBar>
//     </Fragment>
//   )
// }

// export default Header

import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";

import classes from "./Header.module.css";
import { FiSearch } from "react-icons/fi";
import DropdownMenu from "./DropdownMenu";
import UserAuth from "./UserAuth";

const Header = (props) => {
  const location = useLocation();

  // 현재 경로가 로그인 페이지인 경우 Header를 렌더링하지 않음
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes.headerTop}>
          <Link to="/" className={classes.logoWrap}>
            <h1 className={classes.logo}>PANDA.</h1>
          </Link>

          <div className={classes.searchBox}>
            <input type="text" className={classes.search} />

            <button>
              <FiSearch />
            </button>
          </div>

          <div className={classes.AuthList}>
            <UserAuth />
          </div>
        </div>

        <div className={classes.headerBottom}>
          <ul className={classes.list}>
            <div className={classes.dropdown}>
              <li className={classes.purchaseList}>
                <Link to="/products/all" className={classes.purchaseLink}>
                  구매하기
                </Link>
              </li>

              <div className={classes.dropdownContent}>
                <DropdownMenu />
              </div>
            </div>

            <Link to="/products/add" className={classes.AddProductLink}>
              <li className={classes.AddProductList}>판매하기</li>
            </Link>
          </ul>
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
