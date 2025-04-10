import { useState, useEffect } from "react";
import { getCategories } from "../services/api";
import { Camera } from "lucide-react";
import BarcodeScanner from "./BarcodeScanner";
import { motion } from "framer-motion";

function SearchFilterBar({
  onSearch,
  onBarcodeSearch,
  onCategoryChange,
  onSortChange,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [showScanner, setShowScanner] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data.slice(0, 50));
    };
    fetchCategories();
  }, []);

  return (
    <>
      {/* Filter Grid - Improved responsiveness and hover effects */}
      <motion.div
        className="bg-white shadow-md rounded-2xl p-4 md:p-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6 mx-auto w-full max-w-full hover:shadow-2xl transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Search input */}
        <div className="w-full">
          <label className="text-sm text-gray-700 mb-2 block font-semibold tracking-wide">
            Search Products
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search by product name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSearch(searchQuery)}
              className="flex-1 px-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-black font-medium placeholder:text-gray-500"
            />
            <button
              onClick={() => onSearch(searchQuery)}
              className="px-2 py-2 text-sm font-semibold bg-black text-white border border-black rounded-lg hover:bg-white hover:text-black hover:border-black transition-all duration-300 shadow-sm"
            >
              Search
            </button>
          </div>
        </div>

        {/* Category filter */}
        <div className="w-full">
          <label className="text-sm text-gray-700 mb-2 block font-semibold tracking-wide">
            Category
          </label>
          <select
            className="w-full px-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-black font-medium"
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div className="w-full">
          <label className="text-sm text-gray-700 mb-2 block font-semibold tracking-wide">
            Sort By
          </label>
          <select
            className="w-full px-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-black font-medium"
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="">Select</option>
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
            <option value="nutrition-asc">Nutrition Grade (Low to High)</option>
            <option value="nutrition-desc">Nutrition Grade (High to Low)</option>
          </select>
        </div>

        {/* Scan Button */}
        <div className="w-full flex flex-col justify-end">
          <label className="text-sm text-gray-700 mb-2 block font-semibold tracking-wide">
            Barcode Scanner
          </label>
          <button
            onClick={() => setShowScanner(true)}
            className="flex items-center justify-center gap-2 bg-black text-white px-1 py-3 rounded-lg hover:bg-white hover:text-black hover:border hover:border-black transition-all duration-300 shadow-sm w-full"
          >
            <Camera size={18} />
            <span>Scan Barcode</span>
          </button>
        </div>
      </motion.div>

      {/* Barcode Scanner Popup */}
      {showScanner && (
        <BarcodeScanner
          onDetected={(code) => {
            onBarcodeSearch(code);
            setShowScanner(false);
          }}
          onClose={() => setShowScanner(false)}
        />
      )}
    </>
  );
}

export default SearchFilterBar;