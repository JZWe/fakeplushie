import { commerce } from '../lib/commerce';
import { useState, useEffect, useCallback } from 'react';

const useCountries = (checkoutToken) => {
  const [defaultCountry, setDefaultCountry] = useState('');
  const [shippingCountries, setShippingCountries] = useState([]);

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));

  // 獲得 checkoutToken 的行為是非同步的
  // 所以額外傳 id 到這個 function 才比較保險
  const fetchShippingCountries = useCallback(async (id) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      id
    );
    setShippingCountries(countries);
    setDefaultCountry(Object.keys(countries)[0]);
  }, []);

  // 有拿到 token 就撈資料
  useEffect(() => {
    if (checkoutToken) {
      const { id } = checkoutToken;
      fetchShippingCountries(id);
    }
  }, [checkoutToken, fetchShippingCountries]);

  return [countries, defaultCountry];
};

export default useCountries;
