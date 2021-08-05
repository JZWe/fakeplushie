import React from 'react';
import { Button } from '@material-ui/core';
const Category = ({
  category,
  filterProducts,
  categoryClassname,
  setActiveButton,
}) => {
  const onClickHandler = () => {
    filterProducts(category);
    setActiveButton(category);
  };

  return (
    <Button className={categoryClassname} onClick={onClickHandler}>
      {category}
    </Button>
  );
};

export default Category;
