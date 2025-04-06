import ProductExplorer from "../components/ProductExplorer";

function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Explore Food Products 🍽️</h1>
      <ProductExplorer />
    </div>
  );
}

export default Home;
