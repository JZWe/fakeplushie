import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart, refreshCart } from './actions';
import { Navbar } from './components';
import { Mainpage, Checkout, Products, Cart } from './pages';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import './App.css';

import { useProducts, useCategories } from './custom-hooks';
import { commerce } from './lib/commerce';
import { preload, sliderData as images } from './helpers';

const App = () => {
  const [products, fetchProducts] = useProducts();
  const [categories, fetchCategories] = useCategories();

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    preload(images);
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchProducts();
    dispatch(fetchCart());
  }, [dispatch, fetchProducts]);

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );

      setOrder(incomingOrder);
      dispatch(refreshCart());
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  return (
    <Router>
      <>
        <Navbar totalItem={cart.total_items} />
        <Switch>
          <Route exact path="/">
            <Mainpage />
          </Route>
          <Route exact path="/products/">
            <Products categories={categories} products={products} />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route exact path="/checkout">
            <Checkout
              order={order}
              onCaptureCheckout={handleCaptureCheckout}
              error={errorMessage}
            />
          </Route>
          <Route exact path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </>
    </Router>
  );
};

export default App;
