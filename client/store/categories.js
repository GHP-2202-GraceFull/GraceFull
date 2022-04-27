import Axios from "axios";

//ACTION TYPES
const ADD_CATEGORY = "ADD_CATEGORY";
const GET_CATEGORIES = "GET_CATEGORIES";
const REMOVE_CATEGORY = "REMOVE_CATEGORY";

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

const _deleteCategory = (categoryId) => {
  return {
    type: REMOVE_CATEGORY,
    categoryId,
  };
};

//THUNKS
export const fetchCategories = () => {
  return async (dispatch) => {
    const { data: categories } = await Axios.get("/api/categories");
    dispatch(getCategories(categories));
  };
};
export const postCategory = (category) => {
  return async (dispatch) => {
    const { data: newCategory } = await Axios.post("/api/categories", category);
    dispatch(addCategory(newCategory));
    dispatch(fetchCategories());
  };
};

export const deleteCategory = (categoryId) => {
  return async (dispatch) => {
    const deletedCategory = await Axios.delete(`api/categories/${categoryId}`);
    dispatch(_deleteCategory(deletedCategory.id));
    dispatch(fetchCategories());
  };
};

//REDUCER
export default function categoriesReducer(categories = [], action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories;
    case ADD_CATEGORY:
      return [...categories, action.category];
    case REMOVE_CATEGORY:
      return categories.filter((category) => category.id !== action.categoryId);
    default:
      return categories;
  }
}
