import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "../store/singleProduct";

function Header({ itemCount }) {
  return (
    <header className="cartContainer">
      <h1>GraceFull Shopping Cart</h1>
      {/* we can insert links to Home here! */}
      <span className="itemCount">{itemCount} items in the cart</span>
    </header>
  );
}

const Cart = (props) => {
  const [inCart, setInCart] = useState(props.inCart);

  const itemsInCart = useSelector((state) => state.inCart);
  const total = inCart.reduce((accum, item) => accum + (item.price || 0), 0);

  return (
    <div className="cart">
      <Header />
      <h1>Cart</h1>
      <ol className="items-in-cart">
        {itemsInCart.map((item) => {
          return (
            <div key={item.id}>
              <img className="item-image" src={item.imageUrl} />
              <li>{item.title}</li>
              <li>{item.price}</li>
              <li>{item.quantity}</li>
            </div>
          );
        })}
      </ol>
      <div className="cartSummary">
        <ul>
          <li>
            Total <span> {total}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Cart;
