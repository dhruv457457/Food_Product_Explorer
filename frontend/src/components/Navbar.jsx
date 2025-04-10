import { ShoppingCart, Camera, Search } from "lucide-react";

function Navbar({ onCartToggle, onScanToggle, onSearchToggle }) {
  return (
    <nav className="backdrop-blur-md bg-white/90 border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50 shadow-sm">
      <h1 className="text-xl sm:text-2xl font-bold text-primary tracking-tight">
        FoodExpo 🍽️
      </h1>

      <div className="flex items-center gap-3 sm:gap-6">
        {/* Search Icon */}
        <button
          onClick={onSearchToggle}
          className="flex items-center justify-center gap-2 text-primary hover:text-accent transition p-2"
          aria-label="Scroll to search bar"
        >
          <Search size={24} />
        </button>

        {/* Scan Button */}
        <button
          onClick={onScanToggle}
          className="flex items-center justify-center gap-2 text-primary hover:text-accent transition p-2"
          aria-label="Scan barcode"
        >
          <Camera size={24} />
          <span className="hidden sm:inline text-sm">Scan</span>
        </button>

        {/* Cart Button */}
        <button
          onClick={onCartToggle}
          className="relative text-primary hover:text-accent transition p-2"
          aria-label="View cart"
        >
          <ShoppingCart size={24} />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;