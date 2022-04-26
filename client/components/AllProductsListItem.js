import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddToCart from "./AddToCart";

const AllProductsListItem = ({ product }) => {
  const [hover, toggleHover] = useState(false);
  return (
    <div
      id="all-products-item"
      onMouseOver={() => toggleHover(true)}
      onMouseOut={() => toggleHover(false)}
    >
      <div id="product-info" className={hover ? "hover" : ""}>
        <div
          className={hover ? "short-info info-hover" : "short-info"}
          id="product-title"
        >
          <h3>{product.title}</h3>
        </div>
        <div
          className={hover ? "short-info info-hover" : "short-info"}
          id="product-price"
        >
          <h3>${product.price}</h3>
        </div>
        {hover && (
          <>
            <AddToCart product={product} view="all-products" />
            <Link to={`/products/${product.id}`}>More Info {">"}</Link>
          </>
        )}
      </div>
      <img src={product.imageUrl} />
    </div>
  );
};

export default AllProductsListItem;
