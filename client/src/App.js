import React, { Fragment, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Layout/Header";
import Home from "./components/Home/Home";
import Product from "./components/Product/Product";
import AddProduct from "./components/AddProduct/AddProduct";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Detail from "./components/Product/Detail";
import Auth from "./hoc/auth";

function App() {
  const AuthHome = Auth(Home, null);
  const AuthAddProduct = Auth(AddProduct, true);

  const token = localStorage.getItem("accessToken");
  const tokenCheck =
    token !== "undefined" || token !== "null" || token !== ""
      ? Boolean(token)
      : false;

  const [productCard, setProductCard] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(tokenCheck);

  const addProductHandler = (pName, pPrice, pImg, pExplanation, pCategory) => {
    setProductCard((prevProductCard) => {
      return [
        ...prevProductCard,
        {
          name: pName,
          price: pPrice,
          imgFile: pImg,
          explanation: pExplanation,
          category: pCategory,
          id: Math.random().toString(),
        },
      ];
    });
  };

  return (
    <Fragment>
      <BrowserRouter>
        <Header setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<AuthHome />}></Route>
          <Route
            path="/products/all"
            element={<Product ProductCard={productCard} />}
          ></Route>
          <Route
            path="/products/add"
            element={<AuthAddProduct onAddProduct={addProductHandler} />}
          ></Route>
          <Route
            path="/login"
            element={
              <Login setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
            }
          ></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/detail"
            element={<Detail ProductCard={productCard} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
