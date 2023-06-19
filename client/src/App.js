import React, { Fragment, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./_actions/userAction";

import Header from "./components/Layout/Header";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import AddProduct from "./pages/AddProduct/AddProduct";
import Chat from "./pages/Chat/Chat";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Detail from "./pages/Product/Detail";
import Auth from "./hoc/auth";
import Loading from "./components/UI/Loading";
import ScrollTop from "./components/UI/ScrollTop";
import UserInfo from "./pages/User/UserInfo";

import {
  createTheme,
  ThemeProvider,
  useTheme,
  outlinedInputClasses,
  Backdrop,
} from "@mui/material/";

// 테마: focus일때 색상 변경때문에 필요
const customTheme = (outerTheme) =>
  createTheme({
    typography: {
      fontFamily: "GongGothicMedium",
    },
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "--TextField-brandBorderColor": "#E0E3E7",
            "--TextField-brandBorderHoverColor": "#B2BAC2",
            "--TextField-brandBorderFocusedColor": "#1ecfba",
            "& label.Mui-focused": {
              color: "var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: "var(--TextField-brandBorderColor)",
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderHoverColor)",
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
    },
  });

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isLoading = useSelector((state) => state.ui.isLoading);

  const outerTheme = useTheme();

  useEffect(() => {
    dispatch(auth());
  }, [dispatch]);

  const AuthHome = Auth(Home, null);
  const AuthAddProduct = Auth(AddProduct, true);

  return (
    <Fragment>
      <ThemeProvider theme={customTheme(outerTheme)}>
        {isLoggedIn !== null ? (
          <BrowserRouter>
            <ScrollTop />
            <Backdrop open={isLoading}>
              <Loading />
            </Backdrop>
            <Header />
            <Routes>
              <Route path='/' element={<AuthHome />}></Route>
              <Route path='/products/all' element={<Product />}></Route>
              <Route path='/products/add' element={<AuthAddProduct />}></Route>
              <Route path='/chat' element={<Chat />}></Route>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/register' element={<Register />}></Route>
              <Route path='/products/:productId' element={<Detail />}></Route>
              <Route path='/userInfo' element={<UserInfo />}></Route>

              <Route path='/Loading' element={<Loading />}></Route>
            </Routes>
          </BrowserRouter>
        ) : (
          <div>
            <Loading />
          </div>
        )}
      </ThemeProvider>
    </Fragment>
  );
}

export default App;
