import React, { Fragment, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Header from "./components/Layout/Header"
import Home from "./components/Home/Home"
import Purchase from "./components/Purchase/Purchase"
import AddProduct from "./components/AddProduct/AddProduct"
import Login from "./components/Auth/Login"
import Register from "./components/Auth/Register"
import Detail from "./components/Purchase/Detail"
import Auth from "./hoc/auth"

function App() {
  const AuthHome = Auth(Home, null)
  const AuthAddProduct = Auth(AddProduct, true)

  const token = localStorage.getItem("accessToken")
  const tokenCheck =
    token !== "undefined" || token !== "null" || token !== ""
      ? Boolean(token)
      : false

  const [purchaseCard, setPurchaseCard] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(tokenCheck)

  const addProductHandler = (pName, pPrice, pImg, pExplanation, pCategory) => {
    setPurchaseCard((prevPurchaseCard) => {
      return [
        ...prevPurchaseCard,
        {
          name: pName,
          price: pPrice,
          imgFile: pImg,
          explanation: pExplanation,
          category: pCategory,
          id: Math.random().toString(),
        },
      ]
    })
  }

  return (
    <Fragment>
      <BrowserRouter>
        <Header setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path='/' element={<AuthHome />}></Route>
          <Route
            path='/purchase/'
            element={<Purchase purchaseCard={purchaseCard} />}
          ></Route>
          <Route
            path='/addProduct/'
            element={<AuthAddProduct onAddProduct={addProductHandler} />}
          ></Route>
          <Route
            path='/login'
            element={
              <Login setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
            }
          ></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route
            path='/detail/:id'
            element={<Detail purchaseCard={purchaseCard} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  )
}

export default App
