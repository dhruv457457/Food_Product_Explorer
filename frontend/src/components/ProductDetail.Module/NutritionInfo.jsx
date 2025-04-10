function NutritionInfo({ nutriments }) {
    if (!nutriments) return null;
  
    const items = [
      { label: "Energy", value: `${nutriments["energy-kcal"] || "N/A"} kcal` },
      { label: "Fat", value: `${nutriments.fat || "N/A"} g` },
      { label: "Carbs", value: `${nutriments.carbohydrates || "N/A"} g` },
      { label: "Proteins", value: `${nutriments.proteins || "N/A"} g` },
      { label: "Salt", value: `${nutriments.salt || "N/A"} g` },
      { label: "Sugars", value: `${nutriments.sugars || "N/A"} g` },
    ];
  
    return (
      <div className="mt-6 border-t pt-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Nutritional Values <span className="text-sm text-gray-500">(per 100g)</span>
        </h2>
  
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 border rounded-lg px-4 py-2 shadow-sm text-gray-700"
            >
              <p className="font-medium text-gray-600">{item.label}</p>
              <p className="font-semibold">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default NutritionInfo;
  