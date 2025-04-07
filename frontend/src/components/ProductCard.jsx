import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const barcode = product.code;
  const { addToCart } = useCart();

  return (
    <div className="bg-white shadow rounded-lg p-4 hover:shadow-lg transition flex flex-col justify-between">
      <Link to={`/product/${barcode}`}>
        <img
          src={product.image_url || "https://via.placeholder.com/200"}
          alt={product.product_name || "Product"}
          className="object-cover h-40 w-full rounded mb-2 bg-gray-100"
        />
        <h2 className="font-semibold text-lg mb-1">{product.product_name || "Unnamed"}</h2>
        <p className="text-sm text-gray-500 line-clamp-1">{product.categories || "No category"}</p>
        <p className="text-sm mt-1">
          Nutrition Grade:{" "}
          <span className="ml-1 font-bold text-indigo-600 uppercase">
            {product.nutrition_grades || "N/A"}
          </span>
        </p>
      </Link>

      <button
        onClick={() => addToCart(product)}
        className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
