import React, { Fragment, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Layout/Header";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import AddProduct from "./pages/AddProduct/AddProduct";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Detail from "./pages/Product/Detail";
import Auth from "./hoc/auth";

function App() {
  const AuthHome = Auth(Home, null);
  const AuthAddProduct = Auth(AddProduct, true);

  const [productCard, setProductCard] = useState([]);

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
        <Header />
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
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/products/:productId"
            element={<Detail ProductCard={productCard} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
