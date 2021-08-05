import {
  ADD_TO_CART,
  FETCH_CART,
  UPDATE_CART_QUANTITY,
  REMOVE_FROM_CART,
  CLEAR_CART,
  REFRESH_CART,
} from '../actions/type';

const cartReducer = (state = {}, action) => {
  let newState = {};
  switch (action.type) {
    case FETCH_CART:
      newState = JSON.parse(JSON.stringify(action.payload));
      return { ...state, ...newState };
    case ADD_TO_CART:
      newState = JSON.parse(JSON.stringify(action.payload));
      return { ...state, ...newState };
    case UPDATE_CART_QUANTITY:
      newState = JSON.parse(JSON.stringify(action.payload));
      return { ...state, ...newState };
    case REMOVE_FROM_CART:
      newState = JSON.parse(JSON.stringify(action.payload));
      return { ...state, ...newState };
    case CLEAR_CART:
      newState = JSON.parse(JSON.stringify(action.payload));
      return { ...state, ...newState };
    case REFRESH_CART:
      newState = JSON.parse(JSON.stringify(action.payload));
      return { ...state, ...newState };
    default:
      return state;
  }
};

export default cartReducer;
