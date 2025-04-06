function Navbar() {
    return (
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-indigo-600 tracking-wide">FoodExpo 🍽️</h1>
  
        <div className="text-sm text-gray-600 hidden sm:block">
          Powered by OpenFoodFacts API
        </div>
      </nav>
    );
  }
  
  export default Navbar;
  