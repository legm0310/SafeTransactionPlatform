import React, { Fragment, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./_actions/userAction";

import Header from "./components/Layout/Header";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import AddProduct from "./pages/AddProduct/AddProduct";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Detail from "./pages/Product/Detail";
import Auth from "./hoc/auth";
import Loading from "./components/UI/Loading";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    dispatch(auth());
  }, [dispatch]);

  const AuthHome = Auth(Home, null);
  const AuthAddProduct = Auth(AddProduct, true);

  return (
    <Fragment>
      {isLoggedIn !== null ? (
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<AuthHome />}></Route>
            <Route path="/products/all" element={<Product />}></Route>
            <Route path="/products/add" element={<AuthAddProduct />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/products/:productId" element={<Detail />}></Route>

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
