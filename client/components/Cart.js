import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "../store/singleProduct";
import { setCart, addToCart, removeFromCart } from "../store/cart";
import AddToCart from "./AddToCart";
import RemoveFromCart from "./RemoveFromCart";

const Cart = () => {
  const cart = useSelector((state) => state.cartReducer); //Store into component, array of objects
  // const lineItems = cart.lineItems; //array of objects
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCart());
  }, []); //componendDidMount bring items into state ???? DB to global store

  console.log("This is the cart from cart.js", cart);
  // const lineItems = itemsInCart[0];
  //const itemCount = itemsInCart[0].length;

  // //Calculate the total
  // const total = cart.reduce(
  // (accum, item) => accum + (item.price * item.quantity || 0),
  //   0
  //  );

   return (
    <div className="cart">
      <h3>GraceFull Shopping Cart</h3>
      <h4>
        <span className="itemCount">
          There are {cart.length} products in the cart.
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
                    onClick={() => dispatch(removeFromCart(item.product))}
                  >
                    {" "}
                    -{" "}
                  </button>
                  <span> {item.quantity} </span>
                  <button
                    onClick={() => dispatch(addToCart(item.product))}
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
            {/* Total <span> ${total}</span> */}
          </li>
          <button>Checkout</button>
        </ul>
      </div>
    </div>
  );
};

export default Cart;
