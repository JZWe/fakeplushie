import { commerce } from '../lib/commerce';

import {
  ADD_TO_CART,
  FETCH_CART,
  UPDATE_CART_QUANTITY,
  REMOVE_FROM_CART,
  CLEAR_CART,
  REFRESH_CART,
} from '../actions/type';

export const fetchCart = () => async (dispatch) => {
  const cart = await commerce.cart.retrieve();
  dispatch({ type: FETCH_CART, payload: cart });
};

export const addToCart = (productId, quantity) => async (dispatch) => {
  const { cart } = await commerce.cart.add(productId, quantity);
  dispatch({ type: ADD_TO_CART, payload: cart });
};

export const updateCartQuantity = (productId, quantity) => async (dispatch) => {
  const { cart } = await commerce.cart.update(productId, { quantity });
  dispatch({ type: UPDATE_CART_QUANTITY, payload: cart });
};

export const removeFromCart = (productId) => async (dispatch) => {
  const { cart } = await commerce.cart.remove(productId);
  dispatch({ type: REMOVE_FROM_CART, payload: cart });
};

export const clearCart = () => async (dispatch) => {
  const { cart } = await commerce.cart.empty();
  dispatch({ type: CLEAR_CART, payload: cart });
};

export const refreshCart = () => async (dispatch) => {
  const newCart = await commerce.cart.refresh();
  dispatch({ type: REFRESH_CART, payload: newCart });
};
