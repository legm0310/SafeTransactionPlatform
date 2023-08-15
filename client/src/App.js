import React, { Fragment, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./_actions/userAction";

import Header from "./components/headers/Header";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import AddProduct from "./pages/AddProduct/AddProduct";
import Chat from "./pages/Chat/Chat";
import Room from "./pages/Chat/Room";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Detail from "./pages/Product/Detail";
import Auth from "./hoc/auth";
import Loading from "./components/common/Loading";
import ScrollTop from "./components/common/ScrollTop";
import UserInfo from "./pages/User/UserInfo";

import { Backdrop } from "@mui/material";
import { RoomPreferencesOutlined } from "@mui/icons-material";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isLoading = useSelector((state) => state.ui.isLoading);

  useEffect(() => {
    dispatch(auth());
  }, [dispatch]);

  const AuthHome = Auth(Home, null);
  const AuthAddProduct = Auth(AddProduct, true);
  const AuthUserInfo = Auth(UserInfo, true);

  return (
    <Fragment>
      {isLoggedIn !== null ? (
        <BrowserRouter>
          <ScrollTop />
          <Backdrop
            open={isLoading}
            sx={{
              zIndex: "tooltip",
            }}
          >
            <Loading />
          </Backdrop>
          <Header />
          <Routes>
            <Route path="/" element={<AuthHome />}></Route>
            <Route path="/products/all" element={<Product />}></Route>
            <Route path="/products/add" element={<AuthAddProduct />}></Route>
            <Route path="/chat" element={<Room />}></Route>
            <Route path="/chat/:roomId" element={<Room />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/products/:productId" element={<Detail />}></Route>
            <Route path="/user" element={<AuthUserInfo />}></Route>

            <Route path="/Loading" element={<Loading />}></Route>
          </Routes>
        </BrowserRouter>
      ) : (
        <div>
          <Loading />
        </div>
      )}
    </Fragment>
  );
}

export default App;
