import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

function ProductGrid({ products }) {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {products.map((product, index) => (
        <ProductCard key={index} product={product} index={index} />
      ))}
    </motion.div>
  );
}

export default ProductGrid;
