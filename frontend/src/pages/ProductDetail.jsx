import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchProductByBarCode } from "../services/api";
import Loader from "../components/Loader";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import ProductImage from "../components/ProductDetail/ProductImage";
import { ShoppingCart, Share2 } from "lucide-react";

function ProductDetail() {
  const { barcode } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    toast.success(`${product.product_name || "Product"} added to cart!`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: product.product_name,
          text: "Check out this product on FoodExpo!",
          url: window.location.href,
        })
        .catch((err) => console.error("Share failed:", err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await searchProductByBarCode(barcode);
        setProduct(data);
      } catch (error) {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [barcode]);

  if (loading) return <Loader />;
  if (!product)
    return (
      <p className="text-center text-red-500 text-lg py-8">
        Product not found.
      </p>
    );

    return (
      <div className="bg-[#f9fafb] min-h-screen py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow border border-gray-200 text-indigo-600 hover:bg-indigo-700 hover:text-white transition-all mb-6 w-max"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
    
          {/* Product Card */}
          <div className="bg-white rounded-3xl shadow-lg ring-1 ring-indigo-100 border border-gray-100 flex flex-col md:flex-row-reverse gap-8 p-6 md:p-10 transition-all">
            {/* Product Image */}
            <div className="w-full md:w-[45%]">
              <ProductImage src={product.image_url} alt={product.product_name} />
            </div>
    
            {/* Product Info */}
            <div className="w-full md:w-[55%] flex flex-col justify-center">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                {product.product_name || "Unnamed Product"}
              </h1>
              <p className="text-sm text-gray-500 mb-4 italic">
                {product.categories || "No category"}
              </p>
    
              <div className="space-y-2 text-sm text-gray-700 mb-4">
                <p>
                  <strong>Ingredients:</strong>{" "}
                  {product.ingredients_text || "Not available"}
                </p>
                <p>
                  <strong>Labels:</strong> {product.labels || "None"}
                </p>
                <p>
                  <strong>Nutrition Grade:</strong>{" "}
                  <span className="ml-1 font-bold text-indigo-600 uppercase">
                    {product.nutrition_grades || "N/A"}
                  </span>
                </p>
              </div>
    
              {/* Buttons */}
              <div className="flex items-center gap-4 mt-4">
                <button
                  onClick={handleAddToCart}
                  disabled={added}
                  className={`p-3 rounded-full transition-all ${
                    added
                      ? "bg-gray-300 text-white cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white"
                  }`}
                  title="Add to Cart"
                >
                  <ShoppingCart size={20} />
                </button>
    
                <button
                  onClick={handleShare}
                  className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 transition-all"
                  title="Share Product"
                >
                  <Share2 size={20} />
                </button>
              </div>
    
              {/* Nutritional Info */}
              {product.nutriments && (
                <div className="mt-6 border-t pt-4">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    Nutritional Info (per 100g)
                  </h2>
                  <ul className="text-sm text-gray-700 grid grid-cols-2 sm:grid-cols-3 gap-y-2">
                    <li>
                      <strong>Energy:</strong>{" "}
                      {product.nutriments["energy-kcal"] || "N/A"} kcal
                    </li>
                    <li>
                      <strong>Fat:</strong> {product.nutriments.fat || "N/A"} g
                    </li>
                    <li>
                      <strong>Carbs:</strong>{" "}
                      {product.nutriments.carbohydrates || "N/A"} g
                    </li>
                    <li>
                      <strong>Proteins:</strong>{" "}
                      {product.nutriments.proteins || "N/A"} g
                    </li>
                    <li>
                      <strong>Salt:</strong> {product.nutriments.salt || "N/A"} g
                    </li>
                    <li>
                      <strong>Sugars:</strong>{" "}
                      {product.nutriments.sugars || "N/A"} g
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
    
}

export default ProductDetail;
