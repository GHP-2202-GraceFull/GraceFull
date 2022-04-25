import React from "react";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../store/cart";

const RemoveFromCart = (props) => {
  const dispatch = useDispatch();
  const product = props.product;
  console.log("productId for remove", product);
  return (
    <button type="submit" onClick={() => dispatch(removeFromCart(product))}>
      Remove from Cart
    </button>
  );
};

export default RemoveFromCart;
