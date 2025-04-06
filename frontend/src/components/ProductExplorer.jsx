import useProductFetcher from "../hooks/useProductFetcher";
import Loader from "./Loader";
import LoadMoreButton from "./LoadMoreButton";
import SearchFilterBar from "./SearchFilterBar";
import ProductGrid from "./ProductGrid";

function ProductExplorer() {
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
    <div>
      <SearchFilterBar
        onSearch={searchByName}
        onBarcodeSearch={searchByBarcode}
        onCategoryChange={setCategory}
        onSortChange={sortProducts}
      />

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {loading && products.length === 0 ? (
        <Loader />
      ) : products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <ProductGrid products={products} />
      )}

      {!loading && hasMore && products.length > 0 && (
        <LoadMoreButton onClick={loadMore} loading={loading} />
      )}
    </div>
  );
}

export default ProductExplorer;
