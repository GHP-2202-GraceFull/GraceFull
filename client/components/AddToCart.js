import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/addToCart";

const AddToCart = (props) => {
    const dispatch = useDispatch();
    const productId = props.productId
    return (
        <button type="submit" onClick={() => dispatch(addToCart(productId))}>Add to Cart</button>
    )
}

export default AddToCart;