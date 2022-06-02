import React from "react";
import { Routes, Route } from 'react-router-dom';

import Home from "./Home/Home";
import Products from "./Products/Products";

function Main () {
  return (
    <main className="main">
      <Routes>
        <Route element={<Home/>} path='/'/>
        <Route element={<Products/>} path='/Products'/>
      </Routes>
    </main>
  )
}

export default Main;
