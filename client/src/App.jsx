// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../../../DACN_Web/client/src/contexts/AuthContext";
import { CartProvider } from "../../../DACN_Web/client/src/contexts/CartContext";
import "./index.css";
import Register from "./pages/client/Register";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<Register />} />
            {/* Tạm thời route "/" trỏ về Register để test */}
            {/* <Route path="/" element={<Register />} /> */}
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
