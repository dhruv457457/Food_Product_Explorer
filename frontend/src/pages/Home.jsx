import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import headerImg from "../components/h2.png";
import ProductExplorer from "../components/ProductExplorer";
import SearchFilterBar from "../components/SearchFilterBar";
import BarcodeScanner from "../components/BarcodeScanner";
import useProductFetcher from "../hooks/useProductFetcher";
import Navbar from "../components/Navbar";
import CartSidebar from "../components/CartSidebar";

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

  const [showScanner, setShowScanner] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const searchBarRef = useRef(null);
  const productListRef = useRef(null);

  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchIconClick = () => {
    searchBarRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  
  const handleLoadMore = async () => {
    const prevHeight = productListRef.current?.offsetHeight || 0;
    await loadMore();

    setTimeout(() => {
      const newHeight = productListRef.current?.offsetHeight || 0;
      const scrollAmount = newHeight - prevHeight;

      window.scrollBy({
        top: scrollAmount,
        behavior: "smooth",
      });
    }, 100);
  };

  return (
    <div className="bg-[#f5f6fa]">
      <Navbar
        onScanToggle={() => setShowScanner(true)}
        onSearchToggle={handleSearchIconClick}
        onCartToggle={() => setIsCartOpen((prev) => !prev)}
      />

      {}
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

        <div className="absolute inset-0 bg-white/1 backdrop-blur-sm z-10 flex flex-col justify-center items-center px-4">
          <motion.div
            className="text-center mb-2 mt-5"
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

      {}
      <motion.div
        ref={searchBarRef}
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

      {}
      <div className="max-w-7xl mx-auto px-6 sm:px-4 py-8" ref={productListRef}>
        <ProductExplorer
          products={products}
          loading={loading}
          error={error}
          hasMore={hasMore}
          onLoadMore={handleLoadMore}
        />
      </div>

      {}
      {showScanner && (
        <BarcodeScanner
          onDetected={(code) => {
            try {
              searchByBarcode(code);
              setShowScanner(false);
            } catch (err) {
              console.error("Error handling barcode detection:", err);
            }
          }}
          onClose={() => setShowScanner(false)}
        />
      )}

      {}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

export default Home;
