import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    {/* <h1>GraceFull</h1> */}
    <nav>
      <div id="nav-logo">
        <Link>
          ✻ Grace<i>Full</i>
        </Link>
      </div>
      {isLoggedIn ? (
        <div className="nav-links">
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
        </div>
      ) : (
        <div className="nav-links">
          {/* The navbar will show these links before you log in */}
          <div>
            <Link to="/login">Login</Link>
          </div>
          <div>
            <Link to="/signup">Sign Up</Link>
          </div>
          <div>
            <Link to="/products">Products</Link>
          </div>
          <div>
            <Link to="/checkout">Checkout</Link>
          </div>
          <div>
            <Link to="/cart">Cart</Link>
          </div>
        </div>
      )}
    </nav>
    {/* <hr /> */}
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
