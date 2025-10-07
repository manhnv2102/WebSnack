// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../../../DACN_Web/client/src/contexts/AuthContext";
import { CartProvider } from "../../../DACN_Web/client/src/contexts/CartContext";
import "./index.css";
import Register from "./pages/client/Register";
import Login from "./pages/client/Login";
import HomePage from "./pages/client/HomePage";
import ProductsPage from "./pages/client/ProductsPage";
import CartPage from "./pages/client/Cart";
import CheckoutPage from "./pages/client/CheckOutPage";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            {/* <Route path="/order-success" element={<OrderSuccessPage />} /> */}
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
