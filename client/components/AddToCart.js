import React from "react";
import { useDispatch } from "react-redux";
//import { addToCart } from "../store/addToCart";
import { addToCart } from "../store/cart";

const AddToCart = (props) => {
  const dispatch = useDispatch();
  const product = props.product;
  // console.log("productId for addToCart", product);
  return (
    <button type="submit" onClick={() => dispatch(addToCart(product))}>
      Add to Cart
    </button>
  );
};

export default AddToCart;
