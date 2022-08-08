import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { Navbar, Sidebar } from "./components";
import {
  Ecommerce,
  Orders,
  Sale,
  Stacked,
  Pyramid,
  Supplier,
  Area,
  Bar,
  Pie,
  Financial,
  ColorMapping,
  ColorPicker,
  Line,
} from "./pages";
import Product from "./pages/Product";
import AddProduct from "./pages/Product/AddProduct";
import "./App.css";

import { useStateContext } from "./contexts/ContextProvider";
import EditProduct from "./pages/Product/EditProduct";
import { useLocation, useNavigate } from "react-router-dom";
import SignIn from "./pages/Authentication/User/SignIn";
import SignUp from "./pages/Authentication/User/SignUp";
import AdminLogin from "./pages/Authentication/Admin/AdminLogin";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Ecommerce />} />
        <Route path="/ecommerce" element={<Ecommerce />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/sale" element={<Sale />} />
        <Route path="/products" element={<Product />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route exact path="/editProduct" element={<EditProduct />} />
        <Route path="/suppliers" element={<Supplier />} />
        <Route path="/color-picker" element={<ColorPicker />} />
        <Route path="/line" element={<Line />} />
        <Route path="/area" element={<Area />} />
        <Route path="/bar" element={<Bar />} />
        <Route path="/pie" element={<Pie />} />
        <Route path="/financial" element={<Financial />} />
        <Route path="/color-mapping" element={<ColorMapping />} />
        <Route path="/pyramid" element={<Pyramid />} />
        <Route path="/stacked" element={<Stacked />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
