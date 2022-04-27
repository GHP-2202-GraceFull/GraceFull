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
  return async (dispatch, getState) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      // console.log("token exists");
      const response = await axios.get(`/api/cart`, {
        headers: {
          authorization: token,
        },
      });
      const cart = response.data;
      dispatch(_setCart(cart.lineitems));
    } else {
      const inStorage = window.localStorage.getItem("guestCart");
      const cart = inStorage ? JSON.parse(inStorage) : getState().cartReducer;
      console.log("IN THUNK setCART - guestCart", cart);
      //TODO:retrieve cart from localStorage
      dispatch(_setCart(cart));
    }

    // console.log("THUNK set cart", cart.lineitems);
  };
};

export const addToCart = (product) => {
  return async (dispatch, getState) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      const response = await axios.post(`/api/cart/`, product, {
        headers: {
          authorization: token,
        },
      });
      const cart = response.data;
      dispatch(_addToCart(cart.lineitems));
      // console.log("THUNK add to cart", cart.lineitems);
    } else {
      const cart = [...getState().cartReducer];
      const itemIndex = cart.findIndex(
        (lineitem) => lineitem.product.id === product.id
      );
      if (itemIndex > -1) {
        cart[itemIndex] = { product, quantity: cart[itemIndex].quantity + 1 };
        console.log("after Increase", cart);
      } else {
        cart.push({ product, quantity: 1 });
        console.log("adding new product to Cart", cart);
      }
      dispatch(_addToCart(cart));
      dispatch(saveCartToLocalStorage());
    }
  };
};

export const removeFromCart = (product) => {
  return async (dispatch, getState) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      const response = await axios.post(`/api/cart/remove`, product, {
        headers: {
          authorization: token,
        },
      });
      // console.log("PRODUCT SENT IN REMOVE FROM CART", product);
      const cart = response.data;
      dispatch(_removeFromCart(cart.lineitems));
      // console.log("THUNK car.lineitems remove from cart", cart.lineitems);
    } else {
      const cart = [...getState().cartReducer];
      const itemIndex = cart.findIndex(
        (lineitem) => lineitem.product.id === product.id
      );
      if (itemIndex > -1) {
        if (cart[itemIndex].quantity > 0) {
          cart[itemIndex] = { product, quantity: cart[itemIndex].quantity - 1 };
        } else {
          cart.splice(itemIndex, 1);
        }
      }
      dispatch(_addToCart(cart));
      dispatch(saveCartToLocalStorage());
    }
  };
};

export const removeAllFromCart = (product) => {
  return async (dispatch, getState) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      const response = await axios.post(`/api/cart/removeAll`, product, {
        headers: {
          authorization: token,
        },
      });
      const cart = response.data;
      dispatch(_removeAllFromCart(cart.lineitems));
    } else {
      const cart = [...getState().cartReducer];
      const itemIndex = cart.findIndex(
        (lineitem) => lineitem.product.id === product.product.id
      );
      if (itemIndex > -1) {
        cart.splice(itemIndex, 1);
      }
      dispatch(_removeAllFromCart(cart));
      dispatch(saveCartToLocalStorage());
    }
  };
};

const saveCartToLocalStorage = () => {
  return (dispatch, getState) => {
    const cart = getState().cartReducer;
    const cartString = JSON.stringify(cart);

    // //setting the cart in localStorage
    window.localStorage.setItem("guestCart", cartString);
  };
};

//REDUCERS - Cart is an object
export default function cartReducer(state = [], action) {
  switch (action.type) {
    case SET_CART:
      console.log(`This is the SET_CART case:`, action.cart);
      return action.cart;
    case ADD_TO_CART:
      console.log(`addToCart from cartReducer`, action.product);
      return action.product;
    case REMOVE_FROM_CART:
      if (action.product) {
        return action.product;
      } else {
        return state;
      }
    case REMOVE_ALL_FROM_CART:
      console.log(`remove ALL action.product from cartReducer`, action.cart);
      return action.product;
    default:
      return state;
  }
}
