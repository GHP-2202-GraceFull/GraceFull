import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/addToCart";
// import { addToCart } from "../store/cart";

const AddToCart = (props) => {
  const dispatch = useDispatch();
  const productId = props.productId;
  console.log("productId for addToCart", productId);
  return (
    <button type="submit" onClick={() => dispatch(addToCart(productId))}>
      Add to Cart
    </button>
  );
};

export default AddToCart;
