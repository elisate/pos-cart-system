import React from "react";
import ProductCard from "./components/ProductCard";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  return (
    <div>
  <BrowserRouter>
  <Routes>
    <Route path="/"element={<Layout/>}>
    <Route index element={<ProductCard/>}/>
    <Route path="products" element={<ProductCard/>}/>
    <Route path="/cart" element={<ShoppingCart/>}/>
    </Route>
  </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;
