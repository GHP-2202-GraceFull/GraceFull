import axios from "axios";

//ACTION TYPES
const ALL_PRODUCTS = "ALL_PRODUCTS";

//ACTION CREATOR
export const setProducts = (products) => {
  return {
    type: ALL_PRODUCTS,
    products,
  };
};

//THUNK CREATOR
export const fetchAllProducts = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/products");
    const allProducts = response.data;
    const action = setProducts(allProducts);
    dispatch(action);
  };
};

//REDUCER
export default function productsReducer(state = [], action) {
  switch (action.type) {
    case ALL_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}
