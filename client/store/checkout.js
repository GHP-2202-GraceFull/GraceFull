import axios from "axios";


const initialState = {
};


//what needs to happen at checkout?
//order status changed from "CART" to "PURCHASED"
//email to user initiated on order status change
//shipping address added to order
//if user not logged in, user email updated from temp email to actual email



const CHECKOUT = "CHECKOUT";

//action creator
export const _checkout = (data) => {
  return {
    type: CHECKOUT,
    data,
  };
};

//thunks
export const checkoutCart = (data) =>{
  return async (dispatch) => {
    //laurynn TODO create backend method/route
    
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
