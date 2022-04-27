import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../store/users";
import { Card, CardActions, CardContent } from "@material-ui/core";

const AdminUsers = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers({ admin: true }));
  }, []);

  return (
    <div id="user-cards">
      {users.map((user) => (
        <Card key={user.id}>
          <CardContent>
            <div>
              <h3>{user.username}</h3>
            </div>
            <div>
              <strong>Email: </strong>
              {user.email}
            </div>
            {user.admin && (
              <div className="red" id="admin">
                Admin
              </div>
            )}
          </CardContent>
          <CardActions id="user-actions">
            <button>Edit</button>
            <button>Delete</button>
            <button>Password Reset</button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default AdminUsers;
