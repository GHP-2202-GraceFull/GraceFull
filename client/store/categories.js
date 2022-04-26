import Axios from "axios";

//ACTION TYPES
const ADD_CATEGORY = "ADD_CATEGORY";
const GET_CATEGORIES = "GET_CATEGORIES";

//ACTION CREATORS
const addCategory = (category) => {
  return {
    type: ADD_CATEGORY,
    category,
  };
};

const getCategories = (categories) => {
  return {
    type: GET_CATEGORIES,
    categories,
  };
};

//THUNKS
export const fetchCategories = () => {
  return async (dispatch) => {
    const { data: categories } = await Axios.get("/categories");
    dispatch(getCategories(categories));
  };
};
export const postCategory = () => {
  return async (dispatch) => {
    const { data: category } = await Axios.post("/categories", category);
    dispatch(addCategory(category));
  };
};

//REDUCER
export default function categoriesReducer(categories = [], action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories;
    case ADD_CATEGORY:
      return [...categories, action.category];
    default:
      return categories;
  }
}
