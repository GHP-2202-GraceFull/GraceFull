import axios from 'axios';

const initialState = [];

const ADD_TO_CART = 'ADD_TO_CART';

export const _addToCart = (product) => {
    return {
        type: ADD_TO_CART,
        product
    }
};

export const addToCart = (productId) => {
    return async (dispatch) => {
      const response = await axios.get(`/api/products/${productId}`);
      const product = response.data;
      dispatch(_addToCart(product));
      console.log('item to cart')
    };
  };
  

  export default function addToCartReducer(state = initialState, action) {
    switch (action.type) {
      case ADD_TO_CART:
        return action.product;
      default:
        return state;
    }
  }