import headerImg from "../components/h2.png";
import ProductExplorer from "../components/ProductExplorer";
import SearchFilterBar from "../components/SearchFilterBar";
import BarcodeScanner from "../components/BarcodeScanner"; // Ensure this is correctly imported
import useProductFetcher from "../hooks/useProductFetcher";
import Navbar from "../components/Navbar";
import CartSidebar from "../components/CartSidebar";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

function Home() {
  const {
    products,
    loading,
    error,
    hasMore,
    searchByName,
    searchByBarcode,
    sortProducts,
    loadMore,
    setCategory,
  } = useProductFetcher();

  const [showScanner, setShowScanner] = useState(false); // State for the scanner
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); // State for cart sidebar

  const searchBarRef = useRef(null); // Reference to the SearchFilterBar

  // Detect scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to the SearchFilterBar when the search icon is clicked
  const handleSearchIconClick = () => {
    searchBarRef.current?.scrollIntoView({ behavior: "smooth" }); // Scroll to the SearchFilterBar
  };

  return (
    <div className="bg-[#f5f6fa]">
      <Navbar
        onScanToggle={() => setShowScanner(true)} // Toggle scanner visibility
        onSearchToggle={handleSearchIconClick} // Scroll to SearchFilterBar
        onCartToggle={() => setIsCartOpen((prev) => !prev)} // Toggle cart sidebar
      />

      {/* Header Section with Animation */}
      <motion.div
        className="relative w-full min-h-[280px] md:min-h-[280px] overflow-hidden pb-8"
        initial={{ opacity: 1, y: 0 }}
        animate={isScrolled ? { opacity: 0.5, y: -50 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={headerImg}
          alt="Header Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        <div className="absolute inset-0 bg-white/1 backdrop-blur-md z-10 flex flex-col justify-center items-center px-4">
          <motion.div
            className="text-center mb-2 mt-12"
            initial={{ opacity: 1 }}
            animate={isScrolled ? { opacity: 0.5 } : { opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">
              Discover Fresh & Healthy Foods 🥦🍊
            </h1>
            <p className="text-white text-base md:text-lg max-w-2xl mx-auto drop-shadow-sm">
              Scan, search, and explore quality products – powered by OpenFoodFacts.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Filters Section */}
      <motion.div
        ref={searchBarRef} // Attach the ref to the SearchFilterBar container
        className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-20 relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SearchFilterBar
          onSearch={searchByName}
          onBarcodeSearch={searchByBarcode}
          onCategoryChange={setCategory}
          onSortChange={sortProducts}
        />
      </motion.div>

      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-6 sm:px-4 py-8">
        <ProductExplorer
          products={products}
          loading={loading}
          error={error}
          hasMore={hasMore}
          onLoadMore={loadMore}
        />
      </div>

      {/* Barcode Scanner */}
      {showScanner && (
        <BarcodeScanner
          onDetected={(code) => {
            try {
              searchByBarcode(code); // Handle barcode detection
              setShowScanner(false); // Close scanner after detection
            } catch (err) {
              console.error("Error handling barcode detection:", err);
            }
          }}
          onClose={() => setShowScanner(false)} // Close scanner
        />
      )}

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

export default Home;