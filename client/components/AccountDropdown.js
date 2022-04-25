import React from "react";
import { Link } from "react-router-dom";

const AccountDropdown = ({ visible }) => {
  return (
    <div id="dropdown-container" className={visible && "dropdown"}>
      <div>
        <Link>My Orders</Link>
      </div>
      <div>
        <a href="#" onClick={handleClick}>
          Sign Out
        </a>
      </div>
    </div>
  );
};
