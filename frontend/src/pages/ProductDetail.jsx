import {useParams,Link} from 'react-router-dom';
import {useEffect,useState} from 'react';
import {searchProductByBarCode} from '../services/api';
import Loader from '../components/Loader';


function ProductDetail(){
    const {barcode} =useParams();
    const [product,setProduct] =useState(null);
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        const fetchProduct =async()=>{
            try{
                setLoading(true);
                const data =await searchProductByBarCode(barcode);
                setProduct(data);

            }
            catch(error){
                setProduct(null);
            }
            finally{
                setLoading(false);
            }

        };
        fetchProduct();
    },[barcode]);
    
    if (loading) return <Loader />;
    if (!product) return <p className="text-center text-red-500">Product not found.</p>;
    
    
    
    return(
        <div className="max-w-4xl mx-auto px-4 py-8 bg-white shadow rounded-lg">
        <Link to="/" className="text-sm text-indigo-600 hover:underline">&larr; Back to Home</Link>
  
        <div className="mt-4 grid md:grid-cols-2 gap-6">
          <img
            src={product.image_url || 'https://via.placeholder.com/400x400?text=No+Image'}
            alt={product.product_name}
            className="w-full max-h-[400px] object-contain bg-gray-100 rounded"
          />
  
          <div>
            <h1 className="text-2xl font-bold mb-2 text-gray-800">{product.product_name || 'Unnamed Product'}</h1>
            <p className="text-gray-600 mb-4">{product.categories || 'No category available'}</p>
                                                      
            <p className="mb-2"><strong>Ingredients:</strong> {product.ingredients_text || 'Not available'}</p>
            <p className="mb-2"><strong>Labels:</strong> {product.labels || 'None'}</p>
            <p className="mb-2"><strong>Nutrition Grade:</strong> 
              <span className="ml-1 font-semibold text-indigo-600">
                {product.nutrition_grades?.toUpperCase() || 'N/A'}
              </span>
            </p>
  
            {product.nutriments && (
              <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">Nutritional Values (per 100g)</h2>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  <li><strong>Energy:</strong> {product.nutriments['energy-kcal'] || 'N/A'} kcal</li>
                  <li><strong>Fat:</strong> {product.nutriments.fat || 'N/A'} g</li>
                  <li><strong>Carbs:</strong> {product.nutriments.carbohydrates || 'N/A'} g</li>
                  <li><strong>Proteins:</strong> {product.nutriments.proteins || 'N/A'} g</li>
                  <li><strong>Salt:</strong> {product.nutriments.salt || 'N/A'} g</li>
                  <li><strong>Sugars:</strong> {product.nutriments.sugars || 'N/A'} g</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }





export default ProductDetail;