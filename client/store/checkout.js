import axios from "axios";

const initialState = {};


//what needs to happen at checkout?
//order status changed from "CART" to "PURCHASED"
//email to user initiated on order status change
//shipping address added to order
//if user not logged in, user email updated from temp email to actual email



const CHECKOUT = "CHECKOUT";

//action creator
export const _checkout = (cart) => {
  return {
    type: CHECKOUT,
    cart,
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
