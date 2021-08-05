import { useState, useCallback } from 'react';
import { commerce } from '../lib/commerce';

const useProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = useCallback(async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  }, []);

  return [products, fetchProducts];
};

export default useProducts;
