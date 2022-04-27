import React from "react";
import { useDispatch } from "react-redux";
//import { addToCart } from "../store/addToCart";
import { addToCart } from "../store/cart";

import { MdAddShoppingCart } from "react-icons/md";

const AddToCart = (props) => {
  const dispatch = useDispatch();
  const product = props.product;
  // console.log("productId for addToCart", product);
  return (
    <button
      type="submit"
      onClick={() => dispatch(addToCart(product))}
      className="invisible-button"
      id="add-to-cart"
    >
      <MdAddShoppingCart size={24} />
    </button>
  );
};

export default AddToCart;
