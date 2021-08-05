import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../../actions';
import { CartItem } from '../../components';
import useStyles from './styles';

const Cart = () => {
  const classes = useStyles();
  const cart = useSelector((state) => state.cart);
  const [isCartAvaliable, setIsCartAvaliable] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // 判斷是否成功透過 API 取得 cart 的資料
    if (Object.keys(cart).length === 0) {
      setIsCartAvaliable(false);
    } else {
      setIsCartAvaliable(true);
    }
  }, [cart]);

  const EmptyCart = () => {
    return (
      <Typography variant="subtitle1">
        <Link to="/products" className={classes.link}>
          You have no items in your shopping cart, start adding some!
        </Link>
      </Typography>
    );
  };

  const FilledCart = () => {
    return (
      <>
        <Grid container spacing={3}>
          {cart.line_items.map((item) => {
            return (
              <Grid item xs={12} sm={4} key={item.id}>
                <CartItem item={item} />
              </Grid>
            );
          })}
        </Grid>
        <div className={classes.cardDetails}>
          <Typography variant="h4">
            Subtotal: {cart.subtotal.formatted_with_symbol}
          </Typography>
          <div>
            <Button
              className={classes.emptyButton}
              size="large"
              type="button"
              variant="contained"
              color="secondary"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </Button>
            <Button
              component={Link}
              to="/checkout"
              className={classes.checkoutButton}
              size="large"
              type="button"
              variant="contained"
              color="primary"
            >
              Checkout
            </Button>
          </div>
        </div>
      </>
    );
  };

  return (
    <Container>
      <div className={classes.toolbar} />

      {isCartAvaliable && cart.line_items.length === 0 && (
        <>
          <Typography className={classes.title} variant="h3">
            Your Shopping Cart
          </Typography>
          <EmptyCart />
        </>
      )}
      {isCartAvaliable && cart.line_items.length !== 0 && (
        <>
          <Typography className={classes.title} variant="h3">
            Your Shopping Cart
          </Typography>
          <FilledCart />
        </>
      )}
    </Container>
  );
};

export default Cart;
