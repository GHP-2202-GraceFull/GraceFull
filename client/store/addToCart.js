/* eslint-disable no-case-declarations */
import axios from "axios";
const TOKEN = "token";

const initialState = [];

const ADD_TO_CART = "ADD_TO_CART";


export const _addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    product,
  };
};

export const addToCart = (productId) => {
  return async (dispatch) => {
    // getting information on the product
    const response = await axios.post(`/api/products/`, productId);
    const product = response.data;
    // sending the information to the backend route to be updated

    //if product has count ++ || add count to product.count
    dispatch(_addToCart(product));

    console.log("item to cart", product);
  };
};

export default function addToCartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.product];
    default:
      return state;
  }
}
