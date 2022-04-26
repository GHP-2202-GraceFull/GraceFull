/* eslint-disable no-case-declarations */
import axios from "axios";
const TOKEN = "token";

const SET_ORDERS = "SET_ORDERS";

//ACTION CREATORS
export const _setOrders = (orders) => {
  return {
    type: SET_ORDERS,
    orders,
  };
};

//THUNK CREATORS
export const setOrders = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    const response = await axios.get(`/api/orders`, {
      headers: {
        authorization: token,
      },
    });
    const orders = response.data;
    console.log("before dispatch in THUNK set orders", orders);
    dispatch(_setOrders(orders));
    console.log("Afer dispatch THUNK set orders", orders);
  };
};

//REDUCERS
export default function ordersReducer(state = [], action) {
  switch (action.type) {
    case SET_ORDERS:
      console.log(`This is the SET_ORDERS case:`, action.orders);
      return [...state, action.orders];
    default:
      return state;
  }
}
