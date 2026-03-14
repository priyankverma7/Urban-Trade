import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CategoryPage from "./components/category/CategoryPage";
import "./index.css";


import ProductDetails from "./components/products/ProductDetails";
import Purchase from "./components/purchase/Purchase";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./utils/ProtectedRoute";

import { useNotification } from "./hooks/useNotifications";
import { requestPermissionAndGetToken } from "./firebase/messaging";
import Profile from "./components/navbar/Profile";


const App = () => {

  useNotification();

  useEffect(() => {
    requestPermissionAndGetToken();
  }, []);


  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/:categoryId" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
         <Route path="/profile" element={<Profile />} />
        <Route
          path="/purchase/:id"
          element={
            <ProtectedRoute>
              <Purchase />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
