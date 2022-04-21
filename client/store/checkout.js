import axios from "axios";

const initialState = {};

const ADD_TO_CART = "ADD_TO_CART";

//action creator
export const _addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    product,
  };
};

//thunk
export const addToCart = (productId) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/products/${productId}`);
    const product = response.data;
    //if product has count ++ || add count to product.count
    dispatch(_addToCart(product));
    console.log("item to cart", product);
  };
};

//reducer
export default function addToCartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.product];

    default:
      return state;
  }
}
