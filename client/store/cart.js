import axios from "axios";
const TOKEN = "token";

const SET_CART = "SET_CART";
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const UPDATE_CART = "UPDATE_CART";
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

export const _updateCart = (product) => {
  return {
    type: UPDATE_CART,
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
    const cartproduct = response.data;
    dispatch(_setCart(cart));
    console.log("set cart", product);
  };
};

export const addToCart = (productId) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    const response = await axios.post(`/api/cart`, productId, {
      headers: {
        authorization: token,
      },
    });
    const product = response.data;
    dispatch(_addToCart(product));
    console.log("THUNK add to cart", product);
  };
};

export const removeFromCart = (productId) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    const response = await axios.delete(`/api/cart`, productId, {
      headers: {
        authorization: token,
      },
    });
    const product = response.data;
    dispatch(_removeFromCart(product));
    console.log("remove from cart", product);
  };
};

export const updateCart = (productInfo) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    const response = await axios.put(`/api/cart`, productInfo, {
      headers: {
        authorization: token,
      },
    });
    const product = response.data;
    dispatch(_updateCart(product));
    console.log("update cart", product);
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

//REDUCERS
//Cart is an object
export default function cartReducer(state = [], action) {
  switch (action.type) {
    case SET_CART:
      return action.cart;
    case ADD_TO_CART:
      return [...state, action.product];
    case REMOVE_FROM_CART:
      return state.filter((product) => product.id !== action.product.id);
    case UPDATE_CART:
      return; //NEED HELP;
    case EMPTY_CART:
      return [];
    default:
      return state;
  }
}
