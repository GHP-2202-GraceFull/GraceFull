import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setOrders } from "../store/orders";

// As an authenticated user I should be able to view the details of a past order (single past order view): current order status, items with quantity and subtotal, link to original product detail page, and date/time the order was created.

const SinglePastOrder = (props) => {
  const productId = props.match.params.id;
  const dispatch = useDispatch();

  const singleProduct = useSelector((state) => state.singleProduct);

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
  }, []);

  return (
    <div>
      <h1>{singleProduct.title}</h1>
      <AddToCart productId={singleProduct.id} />
      <img src={singleProduct.imageUrl} className="single-product-image" />
      {singleProduct.quantity === 0 ? (
        <h4 className="sold-out">Sold Out!</h4>
      ) : (
        <></>
      )}
      <p>{singleProduct.description}</p>
    </div>
  );
};

export default SinglePastOrder;
