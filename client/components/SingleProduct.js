import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getSingleProduct from "../store/singleProduct";

const SingleProduct = (productId) => {
  const dispatch = useDispatch();
  const singleProduct = useSelector((state) => state.singleProduct);
  useEffect(() => {
    dispatch(getSingleProduct(productId));
  });
  return (
    <div>
      <h1>{singleProduct.title}</h1>
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

export default SingleProduct;
