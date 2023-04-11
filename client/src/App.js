import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Layout/Header";
import Home from "./components/Home/Home";
import Purchase from "./components/Purchase/Purchase";
import AddProduct from "./components/AddProduct/AddProduct";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Purchase/" element={<Purchase />}></Route>
          <Route path="/AddProduct/" element={<AddProduct />}></Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
