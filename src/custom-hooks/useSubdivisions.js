import { commerce } from '../lib/commerce';
import { useState, useEffect } from 'react';

// 與 useCountires 邏輯相同
const useSubdivisions = (shippingCountry) => {
  const [defaultSubdivision, setDefaultSubdivision] = useState('');
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);

  const subdivisions = Object.entries(shippingSubdivisions).map(
    ([code, name]) => ({
      id: code,
      label: name,
    })
  );

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );

    setShippingSubdivisions(subdivisions);
    setDefaultSubdivision(Object.keys(subdivisions)[0]);
  };

  // 如果 shippingCountry 有變動的話，重新 fetch ，來保證 subdivision 跟 country 的資料有對到
  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  return [subdivisions, defaultSubdivision];
};

export default useSubdivisions;
