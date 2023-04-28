import React, { Fragment, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Layout/Header";
import Home from "./components/Home/Home";
import Purchase from "./components/Purchase/Purchase";
import AddProduct from "./components/AddProduct/AddProduct";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

function App() {
  const [purchaseList, setPurchaseList] = useState([]);

  const addProductHandler = (pName, pPrice, pImg) => {
    setPurchaseList((prevPurchaseList) => {
      return [
        ...prevPurchaseList,
        { name: pName, price: pPrice, imgFile: pImg },
      ];
    });
  };

  return (
    <Fragment>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/Purchase/"
            element={<Purchase purchaseList={purchaseList} />}
          ></Route>
          <Route
            path="/AddProduct/"
            element={<AddProduct onAddProduct={addProductHandler} />}
          ></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/Register" element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
