import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

function ProductCard({ product, index }) {
  const barcode = product.code;
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);                      
    toast.success(`${product.product_name || "Product"} added to cart!`);
  };                    

  const grade = (product.nutrition_grades || "N/A").toUpperCase();

  const getBadgeColor = (grade) => {
    switch (grade) {
      case "A":
        return "bg-green-100 text-green-800";
      case "B":
        return "bg-lime-100 text-lime-800";
      case "C":
        return "bg-yellow-100 text-yellow-800";
      case "D":
        return "bg-orange-100 text-orange-800";
      case "E":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <motion.div
      className="bg-neutral-50 rounded-xl shadow-md p-3 sm:p-4 flex flex-col justify-between transition-all duration-300 hover:ring-2 hover:ring-accent hover:shadow-xl hover:shadow-accent/30 hover:scale-[1.02] hover:-translate-y-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link to={`/product/${barcode}`} className="group">
        <div className="relative overflow-hidden rounded-lg bg-gray-100 h-32 sm:h-36 mb-2">
          <img
            src={product.image_url || "https://via.placeholder.com/200"}
            alt={product.product_name || "Product"}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <h2 className="text-base font-semibold text-text truncate">
          {product.product_name || "Unnamed Product"}
        </h2>

        <p className="text-sm text-subtleText truncate">
          {product.categories || "No category"}
        </p>
      </Link>

      {/* Bottom Row */}
      <div className="flex justify-between items-center mt-3">
        <span
          className={`text-xs font-bold px-2 py-1 rounded-full ${getBadgeColor(
            grade
          )}`}
        >
          {grade}
        </span>

        <button
          onClick={handleAddToCart}
          className="bg-accent text-black p-2 rounded-full hover:scale-110 transition"
          title="Add to cart"
        >
          <ShoppingCart size={18} />
        </button>
      </div>
    </motion.div>
  );
}

export default ProductCard;
