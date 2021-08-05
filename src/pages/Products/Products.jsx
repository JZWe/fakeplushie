import React, { useState } from 'react';
import { Grid, Typography } from '@material-ui/core';

import { Product, Category } from '../../components';
import useStyles from './styles';

const Products = ({ categories, products, onAddToCart }) => {
  const classes = useStyles();

  const [activeButton, setActiveButton] = useState('');
  const [isFiltered, setIsFiltered] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const filterProductsByCategoryName = (categoryName) => {
    if (categoryName === 'All') {
      setFilteredProducts(products);
      return;
    }
    setIsFiltered(true);

    const filtered_ps = products.filter(
      (product) => product.categories[0].name === categoryName
    );
    setFilteredProducts(filtered_ps);
  };

  const renderProducts = (products) => {
    return products.map((product) => {
      return (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
          <Product product={product} onAddToCart={onAddToCart} />
        </Grid>
      );
    });
  };

  return (
    <main className={classes.Content}>
      <div className={classes.toolbar} />

      <Grid container className={classes.container}>
        <Grid container className={classes.categoriesList} justify="center">
          {categories.length > 1 && (
            <Typography variant="h6">Choose Categories:</Typography>
          )}
          {categories.length > 1 &&
            categories.map((category) => (
              <Category
                key={category}
                category={category}
                setActiveButton={setActiveButton}
                filterProducts={filterProductsByCategoryName}
                categoryClassname={
                  category !== activeButton
                    ? `${classes.categoryItem}`
                    : `${classes.categoryItem} ${classes.active}`
                }
              />
            ))}
        </Grid>
        <Grid item container className={classes.productsList} spacing={4}>
          {!isFiltered && renderProducts(products)}
          {isFiltered && renderProducts(filteredProducts)}
        </Grid>
      </Grid>
    </main>
  );
};

export default Products;
