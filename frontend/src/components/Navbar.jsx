import { ShoppingCart, Camera, Search } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar({ onCartToggle, onScanToggle, onSearchToggle }) {
  const { cartItems } = useCart();
  const [animateCart, setAnimateCart] = useState(false);

  useEffect(() => {
    if (cartItems.length > 0) {
      setAnimateCart(true);
      const timeout = setTimeout(() => setAnimateCart(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [cartItems]);

  return (
    <nav className="backdrop-blur-md bg-white/90 border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50 shadow-sm">
      <Link
        to="/"
        className="text-xl sm:text-2xl font-bold text-primary tracking-tight hover:text-accent transition-all"
      >
        FoodExpo 🍽️
      </Link>

      <div className="flex items-center gap-3 sm:gap-6">
        <button
          onClick={onSearchToggle}
          className="p-2 rounded-full hover:bg-indigo-100 hover:shadow-md transform transition-all duration-200 hover:scale-105 text-primary"
          aria-label="Search"
        >
          <Search size={22} />
        </button>

        <button
          onClick={onScanToggle}
          className="p-2 rounded-full hover:bg-indigo-100 hover:shadow-md transform transition-all duration-200 hover:scale-105 text-primary"
          aria-label="Scan barcode"
        >
          <Camera size={22} />
        </button>

        <button
          onClick={onCartToggle}
          className={`relative p-2 rounded-full hover:bg-indigo-100 hover:shadow-md transform transition-all duration-200 hover:scale-105 text-primary ${
            animateCart ? "animate-cart-pop" : ""
          }`}
          aria-label="View cart"
        >
          <ShoppingCart size={22} />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
              {cartItems.length}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
