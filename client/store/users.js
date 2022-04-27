import axios from "axios";

//ACTION TYPES
const GET_USERS = "GET_USERS";

//ACTION CREATORS
const setUsers = (users) => {
  return {
    type: GET_USERS,
    users,
  };
};

//THUNKS
export const fetchUsers = (authObj) => {
  return async (dispatch) => {
    const { data: users } = await axios.get("/api/users", authObj);
    console.log(users, "users in thunk");
    dispatch(setUsers(users));
  };
};

//REDUCER
export default function usersReducer(users = [], action) {
  switch (action.type) {
    case GET_USERS:
      return action.users;
    default:
      return users;
  }
}
