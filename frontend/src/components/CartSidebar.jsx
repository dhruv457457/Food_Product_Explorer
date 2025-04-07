import { useCart } from "../context/CartContext";
import { X } from "lucide-react";

function CartSidebar({ isOpen, onClose }) {
  const { cartItems, removeFromCart, clearCart } = useCart();

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">Your Cart</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>
      </div>

      <div className="p-4 space-y-4 overflow-y-auto max-h-[70vh]">
        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-sm">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.code}
              className="border p-3 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-medium text-sm line-clamp-1">
                  {item.product_name || "Unnamed Product"}
                </p>
                <p className="text-xs text-gray-500">
                  {item.nutrition_grades?.toUpperCase() || "N/A"}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.code)}
                className="text-sm text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="p-4 border-t">
          <button
            onClick={clearCart}
            className="w-full bg-red-100 text-red-700 px-4 py-2 rounded hover:bg-red-200"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}

export default CartSidebar;
