import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";

function Navbar({ onCartToggle }) {
  const { cartItems } = useCart();
  const itemCount = cartItems.length;

  return (
    <nav className="backdrop-blur-md bg-white/90 border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50 shadow-sm">
      <h1 className="text-xl sm:text-2xl font-bold text-primary tracking-tight">
        FoodExpo 🍽️
      </h1>

      <div className="flex items-center gap-3 sm:gap-6">
        <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
          Powered by OpenFoodFacts API
        </p>

        <button
          onClick={onCartToggle}
          className="relative text-primary hover:text-accent transition p-2"
          aria-label="View cart"
        >
          <ShoppingCart size={24} />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;