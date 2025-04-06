
import {Link} from 'react-router-dom';

function ProductCard({ product }) {  // D
    const barcode = product.code; // ✅ Must be inside the function
    return (
        <Link 
        to={`/product/${barcode}`}
        className="block bg-white shadow rounded-lg p-4 hover:shadow-xl hover:scale-[1.02] transition-all duration-200" >

    
        <img
          src={product.image_url || 'https://via.placeholder.com/200'}
          alt={product.product_name || 'Product'}
          className="object-cover h-40 w-full rounded-md mb-2"
          />
        <h2 className="font-semibold text-lg mb-1">
          {product.product_name || 'Unnamed Product'}
        </h2>
        <p className="text-sm font-light text-slate-500">
          {product.categories || 'No category'}
        </p>
        <p className="text-sm mt-1">
          Nutrition Grade:
          <span className="ml-1 font-bold text-indigo-600">
            {product.nutrition_grades?.toUpperCase() || 'N/A'}
          </span>
        </p>
    
          </Link>
    );
  }
  
  export default ProductCard;