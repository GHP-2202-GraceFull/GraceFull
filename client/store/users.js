import axios from "axios";

//ACTION TYPES
const GET_USERS = "GET_USERS";
const UPDATE_USER = "UPDATE_USER";

//ACTION CREATORS
const setUsers = (users) => {
  return {
    type: GET_USERS,
    users,
  };
};

const updateUser = (user) => {
  return {
    type: UPDATE_USER,
    user,
  };
};

//THUNKS
export const fetchUsers = (authObj) => {
  return async (dispatch) => {
    const { data: users } = await axios.get("/api/users", authObj);
    dispatch(setUsers(users));
  };
};

export const putUser = (user) => {
  return async (dispatch) => {
    const { data: updatedUser } = await axios.put(
      `/api/users/${user.id}`,
      user
    );
    dispatch(updateUser(updatedUser));
    dispatch(fetchUsers());
  };
};

//REDUCER
export default function usersReducer(users = [], action) {
  switch (action.type) {
    case GET_USERS:
      return action.users;
    case UPDATE_USER:
      return users.map((user) =>
        user.id === action.user.id ? action.user : user
      );
    default:
      return users;
  }
}
