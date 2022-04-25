import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

import { FiShoppingCart } from "react-icons/fi";
import { MdOutlineExpandMore } from "react-icons/md";

//TODO: connect
const Navbar = ({ handleClick, isLoggedIn }) => {
  const [dropdown, setDropdown] = useState(false);
  return (
    <div>
      <nav>
        <div id="nav-logo">
          <Link to="/">
            ✻ Grace<i>Full</i>
          </Link>
        </div>
        <div className="nav-links">
          {/* Checkout link for testing. TODO: Remove once cart is fully functioning */}
          <div>
            <Link to="/checkout">Checkout</Link>
          </div>
          <div>
            <Link to="/products">Products</Link>
          </div>

          {isLoggedIn ? (
            <>
              <div>
                Welcome, <strong> User!</strong>
                <div id="expand-account" onClick={() => setDropdown(!dropdown)}>
                  <MdOutlineExpandMore size={24} />
                </div>
              </div>
              <AuthForm visible={dropdown} />
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
};

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
