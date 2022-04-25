import axios from "axios";


const initialState = {
  cart: [],
  orderData: {}
};


//what needs to happen at checkout?
//order status changed from "CART" to "PURCHASED"
//email to user initiated on order status change
//shipping address added to order
//if user not logged in, user email updated from temp email to actual email



const CHECKOUT = "CHECKOUT";

//action creator
export const _setCart = (cart) => {
  return {
    type: SET_CART,
    cart,
  };
};

export const _checkout = (data, cartId) => {
  return {
    type: CHECKOUT,
    data,
  };
};

//thunks
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

export const checkoutCart = (data, cartId) =>{
  return async (dispatch) => {
    const cart = await find
  }
}

//laurynn TODO create method/backend route for updating cart
//

//reducer
      export default function checkoutReducer(state = initialState, action) {
        switch (action.type){
          case CHECKOUT:
            return action.data;
          default:
            return state;
        }
      }
