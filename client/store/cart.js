/* eslint-disable no-case-declarations */
import axios from "axios";
const TOKEN = "token";

const SET_CART = "SET_CART";
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const EMPTY_CART = "EMPTY_CART";
const UPDATE_CART = "UPDATE_CART";
const INCREASE_QUANTITY = "INCREASE_QUANTITY";
const DECREASE_QUANTITY = "DECREASE_QUANTITY";

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

export const _removeFromCart = (lineitem) => {
  return {
    type: REMOVE_FROM_CART,
    lineitem,
  };
};

export const _emptyCart = (product) => {
  return {
    type: EMPTY_CART,
    product,
  };
};

export const _updateCart = (cart) => {
  return {
    type: UPDATE_CART,
    cart,
  };
};

export const increaseQuantity = (productId) => {
  return {
    type: INCREASE_QUANTITY,
    payload: productId,
  };
};

export const decreaseQuantity = (productId) => {
  return {
    type: DECREASE_QUANTITY,
    payload: productId,
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

// //Laurynn
// export const addToCart = (productId) => {
//   return async (dispatch) => {
//     // getting information on the product
//     const response = await axios.post(`/api/cart/`, productId);
//     const product = response.data;
//     // sending the information to the backend route to be updated

//     //if product has count ++ || add count to product.count
//     dispatch(_addToCart(cart.lineitems));

//     console.log("item to cart", cart.lineitems);
//   };
// };

//NIKKI
export const addToCart = (product) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    const response = await axios.post(`/api/cart/`, product, {
      headers: {
        authorization: token,
      },
    });
    const cart = response.data;
//    dispatch(_addToCart(cart.lineitems));
    console.log("THUNK add to cart", cart.lineitems);
  };
};

export const removeFromCart = (lineitem) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    const response = await axios.delete(`/api/cart`, {
      headers: {
        authorization: token,
      },
      data: { lineitem: lineitem },
    });
    const cart = response.data;
    dispatch(_removeFromCart(cart.lineitems));
    console.log("THUNK remove from cart", cart.lineitems);
  };
};

export const updateCart = (updatedProduct) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    const response = await axios.put(`/api/cart`, updatedProduct, {
      headers: {
        authorization: token,
      },
    });
    const product = response.data;
    dispatch(_updateCart(product));
    console.log("THUNK update cart", product);
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
      return [...state, action.product];
    case REMOVE_FROM_CART:
      return state.filter((product) => product.id !== action.lineitem.id);
    case INCREASE_QUANTITY:
      let tempIncrease = state.cart.map((product) => {
        if (product.id == action.payload) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
      return { ...state, cart: tempIncrease };
     case DECREASE_QUANTITY:
       console.log(`this is state.log`, state.cart)
        let tempDecrease = state.cart.map((product) => {
          if (product.id == action.payload) {
            return { ...product, quantity: product.quantity - 1 };
          }
          return product;
        }).filter((product) => product.quantity !== 0);
        return { ...state, cart: tempDecrease };
     case EMPTY_CART:
      return [];
     case UPDATE_CART:
      return action.cart;
    default:
      return state;
  }
}
