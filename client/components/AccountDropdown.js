import React from "react";
import { Link } from "react-router-dom";

const AccountDropdown = ({ visible }) => {
  console.log("visible inside dropdown component: ", visible);
  return (
    <div id={visible ? "visible-dropdown" : "hidden-dropdown"}>
      <div id="dropdown-container">
        <div>
          <Link to="/orders">My Orders</Link>
        </div>
        <hr />
        <div>
          <a href="#" onClick={() => console.log("sign out clicked")}>
            Sign Out
          </a>
        </div>
      </div>
    </div>
  );
};

export default AccountDropdown;
