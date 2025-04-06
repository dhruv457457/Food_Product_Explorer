import { useState, useEffect } from "react";
import { getCategories } from "../services/api";
import { Camera } from "lucide-react"; // if you're using lucide icons
import BarcodeScanner from "./BarcodeScanner";

function SearchFilterBar({ onSearch, onBarcodeSearch, onCategoryChange, onSortChange }) {
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
      <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
        {/* Search by name */}
        <input
          type="text"
          placeholder="Search by product name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch(searchQuery)}
          className="flex-1 px-4 py-2 border rounded"
        />
        <button
          onClick={() => onSearch(searchQuery)}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Search
        </button>

        {/* Category filter */}
        <select
          className="px-4 py-2 border rounded"
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Sort dropdown */}
        <select
          className="px-4 py-2 border rounded"
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="name-asc">Name A-Z</option>
          <option value="name-desc">Name Z-A</option>
          <option value="nutrition-asc">Nutrition Grade (Low to High)</option>
          <option value="nutrition-desc">Nutrition Grade (High to Low)</option>
        </select>

        {/* Barcode camera scan */}
        <button
          onClick={() => setShowScanner(true)}
          className="flex items-center gap-2 px-4 py-2 border rounded text-indigo-600 hover:bg-indigo-50"
        >
          <Camera size={18} />
          Scan Barcode
        </button>
      </div>

      {showScanner && (
        <BarcodeScanner
          onDetected={(code) => onBarcodeSearch(code)}
          onClose={() => setShowScanner(false)}
        />
      )}
    </>
  );
}

export default SearchFilterBar;
