/* eslint-disable no-case-declarations */
import axios from "axios";
const TOKEN = "token";

const SET_CART = "SET_CART";
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const REMOVE_ALL_FROM_CART = "REMOVE_FROM_CART";

//ACTION CREATORS
export const _setCart = (cart) => {
  return {
    type: SET_CART,
    cart,
  };
};

export const _addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    product,
  };
};

export const _removeFromCart = (product) => {
  return {
    type: REMOVE_FROM_CART,
    product,
  };
};

export const _removeAllFromCart = (product) => {
  return {
    type: REMOVE_ALL_FROM_CART,
    product,
  };
};

//THUNK CREATORS
export const setCart = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    const response = await axios.get(`/api/cart`, {
      headers: {
        authorization: token,
      },
    });
    const cart = response.data;
    dispatch(_setCart(cart.lineitems));
  };
};

export const addToCart = (product) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    const response = await axios.post(`/api/cart/`, product, {
      headers: {
        authorization: token,
      },
    });
    const cart = response.data;
    dispatch(_addToCart(cart.lineitems));
  };
};

export const removeFromCart = (product) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    const response = await axios.post(`/api/cart/remove`, product, {
      headers: {
        authorization: token,
      },
    });
    console.log("PRODUCT SENT IN REMOVE FROM CART", product);
    const cart = response.data;
    dispatch(_removeFromCart(cart.lineitems));
  };
};

export const removeAllFromCart = (product) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    //quantity = 0
    const response = await axios.post(`/api/cart/removeAll`, product, {
      headers: {
        authorization: token,
      },
    });
    const cart = response.data;
    dispatch(_removeAllFromCart(cart.lineitems));
  };
};

//REDUCERS - Cart is an object
export default function cartReducer(state = [], action) {
  switch (action.type) {
    case SET_CART:
      return action.cart;
    case ADD_TO_CART:
      return action.product;
    case REMOVE_FROM_CART:
      return action.product;
    case REMOVE_ALL_FROM_CART:
      return action.product;
    default:
      return state;
  }
}
