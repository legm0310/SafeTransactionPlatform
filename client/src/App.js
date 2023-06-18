import React, { Fragment, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./_actions/userAction";

import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";

import Header from "./components/Layout/Header";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import AddProduct from "./pages/AddProduct/AddProduct";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Detail from "./pages/Product/Detail";
import Auth from "./hoc/auth";
import Loading from "./components/UI/Loading";
import ScrollTop from "./components/UI/ScrollTop";
import UserInfo from "./pages/User/UserInfo";

import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    dispatch(auth());
  }, [dispatch]);

  const AuthHome = Auth(Home, null);
  const AuthAddProduct = Auth(AddProduct, true);

  const theme = createTheme({
    typography: {
      fontFamily: "GongGothicMedium",
    },
  });

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        {isLoggedIn !== null ? (
          <BrowserRouter>
            <ScrollTop />
            <Header />
            <Routes>
              <Route path="/" element={<AuthHome />}></Route>
              <Route path="/products/all" element={<Product />}></Route>
              <Route path="/products/add" element={<AuthAddProduct />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/products/:productId" element={<Detail />}></Route>
              <Route path="/userInfo" element={<UserInfo />}></Route>

              <Route path="/Loading" element={<Loading />}></Route>
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
