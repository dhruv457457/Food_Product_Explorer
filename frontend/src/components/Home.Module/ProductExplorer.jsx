import React from "react";
import ProductCard from "./ProductCard";
import Loader from "../Global.Module/Loader";


function ProductExplorer({ products, loading, error, hasMore, onLoadMore }) {
  if (loading) return <Loader message="Loading Products..." />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="w-full">
      {}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product, index) => (
  <ProductCard
    key={`${product.code || product.id || index}-${index}`}
    product={product}
    index={index}
  />
))}

      </div>

      {}
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

