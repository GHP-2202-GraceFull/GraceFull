import axios from "axios";

//ACTION TYPES
const SINGLE_PRODUCT = "SINGLE_PRODUCTS";

//ACTION CREATOR
export const setSingleProduct = (product) => {
  return {
    type: SINGLE_PRODUCT,
    product,
  };
};

//THUNK CREATOR
export const fetchSingleProduct = (id) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/products/${id}`);
    const singleProduct = response.data;
    const action = setSingleProduct(singleProduct);
    console.log(action, "action in thunk creator");
    dispatch(action);
  };
};

//REDUCER
export default function singleProductReducer(product = {}, action) {
  switch (action.type) {
    case SINGLE_PRODUCT:
      return action.product;
    default:
      return product;
  }
}
