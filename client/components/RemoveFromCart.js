import React from "react";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../store/cart";

const RemoveFromCart = (props) => {
  const dispatch = useDispatch();
  const productId = props.productId;
  console.log("productId for remove", productId);
  return (
    <button type="submit" onClick={() => dispatch(removeFromCart(productId))}>
      Remove from Cart
    </button>
  );
};

export default RemoveFromCart;
