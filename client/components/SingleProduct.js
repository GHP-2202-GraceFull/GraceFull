import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "../store/singleProduct";
import AddToCart from "./AddToCart";

const SingleProduct = (props) => {
  const studentId = props.match.params.id;
  const dispatch = useDispatch();

  const singleProduct = useSelector((state) => state.singleProduct);

  useEffect(() => {
    dispatch(fetchSingleProduct(studentId));
  }, []);

  return (
    <div>
      <h1>{singleProduct.title}</h1>
      <AddToCart productId = {singleProduct.id} />
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
