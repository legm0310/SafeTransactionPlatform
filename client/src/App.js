import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { auth, getInitUser } from "./_actions/userAction";

import Header from "./components/Headers/Header";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import AddProduct from "./pages/AddProduct/AddProduct";
import Chat from "./pages/Chat/Chat";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Detail from "./pages/Detail/Detail";
import Notice from "./pages/Notice/Notice";
import Auth from "./hoc/auth";
import Loading from "./components/common/Loading";
import ScrollTop from "./components/common/ScrollTop";
import UserInfo from "./pages/User/UserInfo";
import Footer from "./components/Footer/Footer";
import Banner from "./components/Banner/Banner";
import Manual from "./components/Manual/Manual";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(
    (state) => state.user.isLoggedIn,
    shallowEqual
  );

  useEffect(() => {
    dispatch(auth());
    dispatch(getInitUser());
  }, [dispatch]);

  const AuthHome = Auth(Home, null);
  const AuthAddProduct = Auth(AddProduct, true);
  const AuthChat = Auth(Chat, true);

  return (
    <Fragment>
      {isLoggedIn !== null ? (
        <BrowserRouter>
          <ScrollTop />
          {/* <Backdrop
            open={isLoading}
            sx={{
              zIndex: "tooltip",
            }}
          >
            <Loading />
          </Backdrop> */}
          <Header />
          <Routes>
            <Route path="/" element={<AuthHome />}></Route>
            <Route path="/products/all" element={<Product />}></Route>
            <Route path="/products/add" element={<AuthAddProduct />}></Route>
            <Route path="/chat" element={<AuthChat />}></Route>
            <Route path="/chat/:roomId" element={<AuthChat />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/notice/:id" element={<Notice />}></Route>
            <Route path="/products/:productId" element={<Detail />}></Route>
            <Route path="/user/:id" element={<UserInfo />}></Route>

            <Route path="/banner" element={<Banner />}></Route>
            <Route path="/manual" element={<Manual />}></Route>
          </Routes>
          <Footer />
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
