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
    dispatch(_setOrders(orders));
  };
};

//REDUCERS
export default function ordersReducer(state = [], action) {
  switch (action.type) {
    case SET_ORDERS:
      return action.orders;
    default:
      return state;
  }
}
