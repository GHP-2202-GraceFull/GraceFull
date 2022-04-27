import axios from "axios";

//ACTION TYPES
const ALL_PRODUCTS = "ALL_PRODUCTS";
const ADD_PRODUCT = "ADD_PRODUCT";
const EDIT_PRODUCT = "EDIT_PRODUCT";

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

const editProduct = (product) => {
  return {
    type: EDIT_PRODUCT,
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
    dispatch(fetchAllProducts());
  };
};

export const putProduct = (product, id, categories) => {
  return async (dispatch) => {
    const sendData = { product, categories };
    const { data: editedProduct } = await axios.put(
      `/api/products/${id}`,
      sendData
    );
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
    case EDIT_PRODUCT:
      //TODO: check logic? return same products except for newly edited product, then return edited product object
      return state.map((product) =>
        product.id === action.product.id ? action.product : product
      );
    default:
      return state;
  }
}
