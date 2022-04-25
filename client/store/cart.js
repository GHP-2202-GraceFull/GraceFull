/* eslint-disable no-case-declarations */
import axios from "axios";
const TOKEN = "token";

const SET_CART = "SET_CART";
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const REMOVE_ALL_FROM_CART = "REMOVE_FROM_CART";
const EMPTY_CART = "EMPTY_CART";

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

export const _emptyCart = (product) => {
  return {
    type: EMPTY_CART,
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
    console.log("THUNK set cart", cart.lineitems);
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
    console.log("THUNK add to cart", cart.lineitems);
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
    const cart = response.data;
    dispatch(_removeFromCart(cart.lineitems));
    console.log("THUNK remove from cart", cart.lineitems);
  };
};

export const removeAllFromCart = (product) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    //quantity = 0
    const response = await axios.post(`/api/cart/remove`, product, {
      headers: {
        authorization: token,
      },
    });
    const cart = response.data;
        dispatch(_removeAllFromCart(cart));
    console.log("THUNK ALL remove from cart", cart);
  };
};

export const emptyCart = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    const response = await axios.get(`/api/cart`, {
      headers: {
        authorization: token,
      },
    });
    const product = response.data;
    dispatch(_emptyCart(product));
    console.log("empty cart", product);
  };
};

//REDUCERS - Cart is an object
export default function cartReducer(state = [], action) {
  switch (action.type) {
    case SET_CART:
      console.log(`This is the SET_CART case:`, action.cart);
      return action.cart;
    case ADD_TO_CART:
      console.log(`add action.product from cartReducer`, action.product);
      return action.product;
    case REMOVE_FROM_CART:
      console.log(`remove action.product from cartReducer`, action.product);
      return action.product;
   case REMOVE_ALL_FROM_CART:
      console.log(`remove ALL action.product from cartReducer`, action.cart);
      return action.cart;
    case EMPTY_CART:
      return [];
    default:
      return state;
  }
}
