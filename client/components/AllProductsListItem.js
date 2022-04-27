import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddToCart from "./AddToCart";

const AllProductsListItem = ({ product }) => {
  const [hover, toggleHover] = useState(false);
  return (
    <div
      id="all-products-item"
      onMouseOver={() => toggleHover(true)}
      onMouseLeave={() => toggleHover(false)}
    >
      <div id="product-info" className={hover ? "hover" : ""}>
        {hover && (
          <>
            <AddToCart product={product} view="all-products" />
            <div className="centered">
              <p id="description">
                {product.description.slice(0, 170) + "..."}
              </p>
              <Link to={`/products/${product.id}`} id="more-info">
                More Info {">"}
              </Link>
            </div>
          </>
        )}
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
      </div>
      <img src={product.imageUrl} />
    </div>
  );
};

export default AllProductsListItem;
