import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Navbar from "./components/Navbar";
import CartSidebar from "./components/CartSidebar";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans">
      <Navbar onCartToggle={() => setIsCartOpen(true)} />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {}
      <div className="pt-[40px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:barcode" element={<ProductDetail />} />
        </Routes>
      </div>
    </div>
  );
}



export default App;
