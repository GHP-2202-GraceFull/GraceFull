import axios from "axios";

//ACTION TYPES
const ALL_PRODUCTS = "ALL_PRODUCTS";
const ADD_PRODUCT = "ADD_PRODUCT";

//ACTION CREATOR
export const setProducts = (products) => {
  return {
    type: ALL_PRODUCTS,
    products,
  };
};

const _addProduct = (product) => {
  return {
    type: ADD_PRODUCT,
    product,
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

export const addProduct = (product, categories) => {
  return async (dispatch) => {
    if (product.imageUrl === "") {
      delete product.imageUrl;
    }
    const sendData = { product, categories };
    const response = await axios.post("/api/products", sendData);
    const newProduct = response.data;
    dispatch(_addProduct(newProduct));
    dispatch(fetchAllProducts());
  };
};

//REDUCER
export default function productsReducer(state = [], action) {
  switch (action.type) {
    case ALL_PRODUCTS:
      return action.products;
    case ADD_PRODUCT:
      return [...state, action.product];
    default:
      return state;
  }
}
