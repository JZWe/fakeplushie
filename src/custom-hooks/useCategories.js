import { useState, useCallback } from 'react';
import { commerce } from '../lib/commerce';

const useCategories = () => {
  const [categories, setCategories] = useState(['All']);

  const fetchCategories = useCallback(async () => {
    const { data } = await commerce.categories.list();
    data.forEach((category) => {
      setCategories((prevCategories) => [...prevCategories, category.name]);
    });
  }, []);

  return [categories, fetchCategories];
};

export default useCategories;
