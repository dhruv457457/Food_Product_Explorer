import { useEffect, useState } from 'react';
import {
  getProductsByCategory,
  searchProductsByName,
  searchProductByBarCode
} from '../services/api';

function useProductFetcher(initialCategory = 'snacks') {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState(initialCategory);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchByCategory(true);
  }, [category]);

  const fetchByCategory = async (reset = false, pg = page) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProductsByCategory(category, pg);
      if (Array.isArray(data)) {
        setProducts((prev) => (reset ? data : [...prev, ...data]));
        setHasMore(data.length > 0);
      } else {
        setError('Invalid response.');
      }
    } catch (err) {
      setError('Failed to fetch category products.');
    } finally {
      setLoading(false);
    }
  };

  const searchByName = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchProductsByName(query);
      setProducts(data);
      setHasMore(false);
    } catch (err) {
      setError('Search failed.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const searchByBarcode = async (barcode) => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchProductByBarCode(barcode);
      setProducts(data ? [data] : []);
      setHasMore(false);
    } catch (err) {
      setError('Barcode search failed.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    await fetchByCategory(false, nextPage);
  };

  const sortProducts = (sortType) => {
    const sorted = [...products];
    if (sortType === 'name-asc') {
      sorted.sort((a, b) => (a.product_name || '').localeCompare(b.product_name || ''));
    } else if (sortType === 'name-desc') {
      sorted.sort((a, b) => (b.product_name || '').localeCompare(a.product_name || ''));
    } else if (sortType === 'nutrition-asc') {
      sorted.sort((a, b) => (a.nutrition_grades || 'z').localeCompare(b.nutrition_grades || 'z'));
    } else if (sortType === 'nutrition-desc') {
      sorted.sort((a, b) => (b.nutrition_grades || 'z').localeCompare(a.nutrition_grades || 'z'));
    }
    setProducts(sorted);
  };

  return {
    products,
    loading,
    error,
    hasMore,
    searchByName,
    searchByBarcode,
    sortProducts,
    loadMore,
    setCategory,
  };
}

export default useProductFetcher;
