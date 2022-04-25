import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const AccountDropdown = ({ visible }) => {
  const dispatch = useDispatch();
  return (
    <div id={visible ? "visible-dropdown" : "hidden-dropdown"}>
      <div id="dropdown-container">
        <div>
          <Link to="/orders">My Orders</Link>
        </div>
        <hr />
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
