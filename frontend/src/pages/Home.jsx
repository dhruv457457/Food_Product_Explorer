import headerImg from "../components/h2.png";
import ProductExplorer from "../components/ProductExplorer";
import SearchFilterBar from "../components/SearchFilterBar";
import useProductFetcher from "../hooks/useProductFetcher";

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

  return (
    <div className="bg-[#f5f6fa]">
      {/* Header Section */}
      <div className="relative w-full min-h-[280px] md:min-h-[280px] overflow-hidden pb-8">
        <img
          src={headerImg}
          alt="Header Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        <div className="absolute inset-0 bg-white/1 backdrop-blur-md z-10 flex flex-col justify-center items-center px-4">
          <div className="text-center mb-2 mt-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">
              Discover Fresh & Healthy Foods 🥦🍊
            </h1>
            <p className="text-white text-base md:text-lg max-w-2xl mx-auto drop-shadow-sm">
              Scan, search, and explore quality products – powered by OpenFoodFacts.
            </p>
          </div>
        </div>
      </div>

      {/* Filters Section — Moved Here */}
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-20  relative">
        <SearchFilterBar
          onSearch={searchByName}
          onBarcodeSearch={searchByBarcode}
          onCategoryChange={setCategory}
          onSortChange={sortProducts}
        />
      </div>

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
    </div>
  );
}

export default Home;
