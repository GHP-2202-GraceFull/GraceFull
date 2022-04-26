import React from "react";
import { Link } from "react-router-dom";
import AddToCart from "./AddToCart";

const AllProductsListItem = ({ product }) => {
  return (
    <div id="all-products-item">
      <h3>{product.title}</h3>
      <h3>${product.price}</h3>
      <AddToCart product={product} />
      <Link to={`/products/${product.id}`}>More Info</Link>
      <img src={product.imageUrl} />
    </div>
  );
};

export default AllProductsListItem;
