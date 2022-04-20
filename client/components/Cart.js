import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "../store/singleProduct";
import { addToCart } from "../store/addToCart";

const Cart = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log("STATE", state);
  const itemsInCart = useSelector((state) => state.addToCartReducer);

  console.log("itemsInCart", itemsInCart);

  //   useEffect(() => {
  //     dispatch(fetchSingleProduct(productId));
  //   }, []);
  const total = itemsInCart.reduce(
    (accum, item) => accum + (item.price || 0),
    0
  );

  return (
    <div className="cart">
      <h3>GraceFull Shopping Cart</h3>
      <h4>
        <span className="itemCount">
          There are {itemsInCart.length} items in the cart
        </span>
      </h4>
      <ul className="items-in-cart">
        {itemsInCart.map((item) => {
          return (
            <div key={item.id}>
              <img className="item-image" src={item.imageUrl} />
              <li>{item.title}</li>
              <li>Price: ${item.price}</li>
              <li>Quantity: {item.quantity}</li>
            </div>
          );
        })}
      </ul>
      <div className="cartSummary">
        <ul>
          <li>
            Total <span> ${total}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Cart;
