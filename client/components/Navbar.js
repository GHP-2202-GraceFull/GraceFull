import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

import { FiShoppingCart } from "react-icons/fi";
import { MdOutlineExpandMore } from "react-icons/md";

//TODO: connect
const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    {/* <h1>GraceFull</h1> */}
    <nav>
      <div id="nav-logo">
        <Link to="/">
          ✻ Grace<i>Full</i>
        </Link>
      </div>
      <div className="nav-links">
        {/* The navbar will show these links before you log in */}
        {/* <div>
          <Link to="/signup">Sign Up</Link>
        </div>
        <div>
          <Link to="/login">Sign In</Link>
        </div> */}
        <div>
          <Link to="/products">Products</Link>
        </div>
        {/* <div>
          <Link to="/checkout">Checkout</Link>
        </div> */}
        {isLoggedIn ? (
          <>
            <div>
              Welcome, <strong>User!</strong> <MdOutlineExpandMore />
            </div>
            <div>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
          </>
        ) : (
          <div>
            <Link to="/login">Sign In</Link>
          </div>
        )}
        <div>
          <span>0</span>
          <Link to="/cart">
            <FiShoppingCart size={24} />
          </Link>
        </div>
      </div>
    </nav>
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
