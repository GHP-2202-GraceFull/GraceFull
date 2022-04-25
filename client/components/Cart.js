import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "../store/singleProduct";
import { setCart, increaseQuantity, decreaseQuantity } from "../store/cart";
import AddToCart from "./AddToCart";
import RemoveFromCart from "./RemoveFromCart";

const Cart = () => {
  const cart = useSelector((state) => state.cartReducer); //Store into component
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCart());
  }, []); //componendDidMount bring items into state ???? DB to global store

  console.log("itemsInCart", cart);
  // const lineItems = itemsInCart[0];
  //const itemCount = itemsInCart[0].length;

  //Calculate the total
  const total = cart.reduce(
  (accum, item) => accum + (item.price || 0),
    0
   );

  console.log(
    `itemsInCart.map`,
    cart.map((item) => item.product)
  );

  return (
    <div className="cart">
      <h3>GraceFull Shopping Cart</h3>
      <h4>
        <span className="itemCount">
          There are {cart.length} items in the cart
        </span>
      </h4>
      <ul className="items-in-cart">
        {cart.length === 0
          ? "Loading..."
          : cart.map((item) => {
              return (
                <div key={item.id}>
                  <img className="item-image" src={item.product.imageUrl} />
                  <li>{item.product.title}</li>
                  <li>Price: ${item.product.price}</li>
                  <li>Quantity</li>
                  <button
                    onClick={() => dispatch(decreaseQuantity(item.product.id))}
                  >
                    {" "}
                    -{" "}
                  </button>
                  <span> {item.quantity} </span>
                  <button
                    onClick={() => dispatch(increaseQuantity(item.product.id))}
                  >
                    {" "}
                    +{" "}
                  </button>
                  <RemoveFromCart product={item} />
                </div>
              );
            })}
      </ul>
      <div className="cartSummary">
        <ul>
          <li>
            Total <span> ${total}</span>
          </li>
          <button>Checkout</button>
        </ul>
      </div>
    </div>
  );
};

export default Cart;
