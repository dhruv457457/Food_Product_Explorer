import { useState, useEffect } from "react";
import { getCategories } from "../../services/api";
import { Camera, X } from "lucide-react";
import BarcodeScanner from "./BarcodeScanner";
import { motion, AnimatePresence } from "framer-motion";

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
      <motion.div
        className="bg-white shadow-lg rounded-2xl p-4 md:p-6 mb-6 mx-auto w-full max-w-7xl hover:shadow-xl transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {}
        <div className="flex flex-col md:flex-row md:items-end md:gap-6 w-full">

          {}
          <div className="w-full md:flex-1 mb-4 md:mb-0">
            <label className="text-sm text-gray-600 mb-1 block font-medium">
              Search Products
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search by name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onSearch(searchQuery)}
                className="flex-1 px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black placeholder:text-gray-400 font-medium"
              />
              <button
                onClick={() => onSearch(searchQuery)}
                className="px-4 py-2.5 text-sm font-semibold bg-black text-white rounded-xl hover:bg-white hover:text-black hover:border hover:border-black transition-all duration-300"
              >
                Search
              </button>
            </div>
          </div>

          {}
          <div className="flex flex-row gap-4 w-full md:w-auto">
            {}
            <div className="flex-1 min-w-[100px]">
              <label className="text-sm text-gray-600 mb-1 block font-medium">
                Category
              </label>
              <select
                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black font-medium"
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

            {}
            <div className="flex-1 min-w-[100px]">
              <label className="text-sm text-gray-600 mb-1 block font-medium">
                Sort By
              </label>
              <select
                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black font-medium"
                onChange={(e) => onSortChange(e.target.value)}
              >
                <option value="">Select</option>
                <option value="name-asc">Name A-Z</option>
                <option value="name-desc">Name Z-A</option>
                <option value="nutrition-asc">Nutrition Grade ↑</option>
                <option value="nutrition-desc">Nutrition Grade ↓</option>
              </select>
            </div>

            {}
            <div className="w-[60px] flex flex-col justify-end">
              <label className="text-sm text-gray-600 mb-1 block font-medium">
                Scan
              </label>
              <button
                onClick={() => setShowScanner(true)}
                className="w-full h-[44px] flex items-center justify-center gap-2 bg-black text-white rounded-xl hover:bg-white hover:text-black hover:border hover:border-black transition-all duration-300"
              >
                <Camera size={18} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {}
      <AnimatePresence>
        {showScanner && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white w-full max-w-xl rounded-2xl shadow-lg relative p-4 sm:p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setShowScanner(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-black transition"
              >
                <X size={20} />
              </button>
              <BarcodeScanner
                onDetected={(code) => {
                  onBarcodeSearch(code);
                  setShowScanner(false);
                }}
                onClose={() => setShowScanner(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default SearchFilterBar;
