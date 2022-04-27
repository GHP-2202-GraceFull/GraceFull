import axios from "axios";
const TOKEN = "token";



const initialState = {
};


//what needs to happen at checkout:
//order status changed from "CART" to "PURCHASED"
//email to user initiated on order status change
//shipping address added to order
//if user not logged in, user email updated from temp email to actual email


const USER_EMAIL = "USER_EMAIL"
const CHECKOUT = "CHECKOUT";


//action creators
export const _getEmail = (email) => {
  return {
    type: USER_EMAIL,
    email,
  };
};

export const _checkout = (data) => {
  return {
    type: CHECKOUT,
    data,
  };
};

//thunks laurynn TODO: route that sends back user email
// export const getUser = () =>{
//   return async (dispatch) => {
//     const token = window.localStorage.getItem(TOKEN);
    
//     dispatch(_getEmail(email));
//   };
// }

export const checkoutCart = (shippingInfo) =>{
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    const response = await axios.put(`/api/cart`, shippingInfo, {
      headers: {
        authorization: token,
      },
    });
    const cart = response.data;
    console.log('thunk checkout data', cart)
    dispatch(_checkout(cart));
  };
}


//reducer
      export default function checkoutReducer(state = initialState, action) {
        switch (action.type){
          case CHECKOUT:
            console.log('checkout reducer ', action.cart)
            return {...state, cart: action.cart};
          default:
            return state;
        }
      }


