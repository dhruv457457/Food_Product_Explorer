import React from "react";
import Loader from "./Loader";
import LoadMoreButton from "./LoadMoreButton";
import ProductGrid from "./ProductGrid";
import ProductCard from "./ProductCard";

function ProductExplorer({ products, loading, error, hasMore, onLoadMore }) {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="w-full">
      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="mt-6 text-center">
          <button
            onClick={onLoadMore}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-white hover:text-black border border-black transition-all duration-300"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductExplorer;

