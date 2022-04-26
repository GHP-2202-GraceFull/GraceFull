import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { setCart } from "../store/cart";
import { FiShoppingCart } from "react-icons/fi";
import { MdOutlineExpandMore } from "react-icons/md";

import AccountDropdown from "./AccountDropdown";

const Navbar = () => {
  const [dropdown, setDropdown] = useState(false);
  const user = useSelector((state) => state.auth.username);
  const cart = useSelector((state) => state.cartReducer);
  const totalCartCount = cart.reduce(
    (accum, item) => accum + (item.quantity || 0),
    0
  );
  //TODO: BUG -> when a user signs up and logs back in, dropdown remembers state of 'true'
  const isLoggedIn = useSelector((state) => !!state.auth.id);
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
                Welcome, {user}
                <div id="expand-account" onClick={() => setDropdown(!dropdown)}>
                  {/*TODO: Clean up ternerary for classname - can't figure out how to make a simple conditional within the component props*/}
                  <MdOutlineExpandMore
                    size={24}
                    className={dropdown ? "flip-vertical" : ""}
                  />
                </div>
              </div>
              <AccountDropdown visible={dropdown} />
            </>
          ) : (
            <div>
              <Link to="/login">Sign In</Link>
            </div>
          )}
          <div>
            <span>{totalCartCount}</span>
            <Link to="/cart">
              <FiShoppingCart size={24} />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
