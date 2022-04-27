import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchUsers, putUser } from "../../store/users";
import { Card, CardActions, CardContent } from "@material-ui/core";
import { MdOutlineSaveAlt } from "react-icons/md";

const AdminUsers = () => {
  const users = useSelector((state) => state.users);
  users.sort((a, b) => a.id - b.id);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers({ admin: true }));
  }, []);

  return (
    <div id="admin-user-view">
      <div id="user-cards">
        {users.map((user) => (
          <Card key={user.id}>
            <CardContent className="content">
              <div>
                <h3>{user.username}</h3>
              </div>
              <div>
                <strong>Email: </strong>
                {user.email}
              </div>
              {user.admin && <div className="red admin">Admin</div>}
              <div>
                <button
                  type="button"
                  onClick={() => {
                    const newStatus = !user.admin;
                    dispatch(putUser({ ...user, admin: newStatus }));
                  }}
                >
                  Toggle Admin Status
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => dispatch(deleteUser(user.id))}
                >
                  Delete
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;
