import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";

function Navbar({ onCartToggle }) {
  const { cartItems } = useCart();
  const itemCount = cartItems.length;

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <h1 className="text-2xl font-bold text-indigo-600 tracking-wide">FoodExpo 🍽️</h1>

      <div className="flex items-center gap-4">
        <p className="text-sm text-gray-600 hidden sm:block">
          Powered by OpenFoodFacts API
        </p>

        <button
          onClick={onCartToggle}
          className="relative text-indigo-600 hover:text-indigo-800 transition"
          aria-label="View cart"
        >
          <ShoppingCart size={24} />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
