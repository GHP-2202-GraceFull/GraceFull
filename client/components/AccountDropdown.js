import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const AccountDropdown = ({ visible }) => {
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.auth.admin);
  console.log(isAdmin, "isAdmin");
  return (
    <div id={visible ? "visible-dropdown" : "hidden-dropdown"}>
      <div id="dropdown-container">
        <div>
          <Link to="/orders">My Orders</Link>
        </div>
        <hr />
        {isAdmin && (
          <>
            <div>
              <Link to="/admin">Admin Dashboard</Link>
            </div>
            <hr />
          </>
        )}
        <div>
          <a href="#" onClick={() => dispatch(logout())}>
            Sign Out
          </a>
        </div>
      </div>
    </div>
  );
};

export default AccountDropdown;
