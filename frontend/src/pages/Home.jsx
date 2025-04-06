import { useEffect, useState } from "react";
import { getProductsByCategory } from '../services/api';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // 🔹 optional error display

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProductsByCategory('snacks');
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
          setError("⚠️ API did not return an array");
          console.error("⚠️ API did not return an array:", data);
        }
      } catch (error) {
        console.error("🚨 Fetch error:", error.message || error);
        setError("🚨 Failed to fetch products.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Explore Food Products 🍽️</h1>

      {error && (
        <p className="text-red-500 mb-4">{error}</p>
      )}

      {loading ? (
        <Loader />
      ) : products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
