// src/services/api.js

const BASE_URL = 'https://world.openfoodfacts.org';

// ✅ 1. Get products by category (fallback using search)
export const getProductsByCategory = async (category = 'snacks', page = 1) => {
  try {
    // Category endpoint (can fail)
    const res = await fetch(`${BASE_URL}/category/${category}/${page}.json`, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json'
      }
    });

    // If the response is not JSON or fails
    if (!res.ok || res.headers.get('content-type')?.includes('text/html')) {
      console.warn(`⚠️ Falling back to search API for category: ${category}`);
      return await fallbackSearch(category);
    }

    const data = await res.json();
    return data.products || [];
  } catch (error) {
    console.error(`❌ Category API error: ${error.message}`);
    return await fallbackSearch(category);
  }
};

// ✅ Fallback: Use search for category term
const fallbackSearch = async (category) => {
  try {
    const res = await fetch(`${BASE_URL}/cgi/search.pl?search_terms=${category}&json=true`);
    const data = await res.json();
    return data.products || [];
  } catch (error) {
    console.error('❌ Fallback search failed:', error.message);
    return [];
  }
};

// ✅ 2. Search products by name
export const searchProductsByName = async (query) => {
  try {
    const res = await fetch(`${BASE_URL}/cgi/search.pl?search_terms=${query}&json=true`);
    const data = await res.json();
    return data.products || [];
  } catch (error) {
    console.error('❌ Search by name error:', error.message);
    return [];
  }
};

// ✅ 3. Search product by barcode
export const searchProductByBarCode = async (barcode) => {
  try {
    const res = await fetch(`${BASE_URL}/api/v0/product/${barcode}.json`);
    const data = await res.json();
    return data.product || null;
  } catch (error) {
    console.error('❌ Barcode search error:', error.message);
    return null;
  }
};

// ✅ 4. Get categories (optional)
export const getCategories = async () => {
  try {
    const res = await fetch(`${BASE_URL}/categories.json`);
    const data = await res.json();
    return data.tags || [];
  } catch (error) {
    console.error('❌ Categories fetch error:', error.message);
    return [];
  }
};
