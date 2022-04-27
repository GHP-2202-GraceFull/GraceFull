import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../store/users";

const AdminUsers = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers({ admin: true }));
  }, []);

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <div>{user.username}</div>
          <div>{user.email}</div>
        </div>
      ))}
    </div>
  );
};

export default AdminUsers;
