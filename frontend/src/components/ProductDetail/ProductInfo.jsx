function ProductInfo({ name, categories, ingredients, labels, grade }) {
    const gradeColor = {
      A: "bg-green-100 text-green-800",
      B: "bg-lime-100 text-lime-800",
      C: "bg-yellow-100 text-yellow-800",
      D: "bg-orange-100 text-orange-800",
      E: "bg-red-100 text-red-800",
      default: "bg-gray-100 text-gray-600",
    };
  
    const badgeStyle = gradeColor[grade?.toUpperCase()] || gradeColor.default;
  
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-1">
          {name || "Unnamed Product"}
        </h1>
        <p className="text-sm text-gray-500 mb-4 italic">
          {categories || "No category available"}
        </p>
  
        <div className="space-y-3 text-sm text-gray-700">
          <p>
            <span className="font-medium text-gray-600">Ingredients:</span>{" "}
            {ingredients || "Not available"}
          </p>
          <p>
            <span className="font-medium text-gray-600">Labels:</span>{" "}
            {labels || "None"}
          </p>
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-600">Nutrition Grade:</span>
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full ${badgeStyle}`}
            >
              {grade?.toUpperCase() || "N/A"}
            </span>
          </div>
        </div>
      </div>
    );
  }
  
  export default ProductInfo;
  