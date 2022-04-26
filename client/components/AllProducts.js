import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../store/allProducts";
import AddToCart from "./AddToCart";
import AllProductsListItem from "./AllProductsListItem";

const AllProducts = () => {
  const [sort, setSort] = useState(null);
  const [filter, setFilter] = useState("");
  const dispatch = useDispatch();
  let products = useSelector((state) => {
    return state.allProducts;
  });

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  sort === "lowHigh"
    ? products.sort((a, b) => a.price - b.price)
    : sort === "highLow"
    ? products.sort((a, b) => b.price - a.price)
    : null;

  if (filter && filter !== "") {
    products = products.filter((product) => {
      const categoryNames = product.categories.map((category) => category.name);
      return categoryNames.includes(filter);
    });
  }

  return (
    <div>
      <button onClick={() => setSort("lowHigh")}>Price: low to high</button>
      <button onClick={() => setSort("highLow")}>Price: high to low</button>
      <label htmlFor="filter">
        <select
          name="filter"
          onChange={(event) => {
            setFilter(event.target.value);
          }}
        >
          <option value="">All Categories</option>
          <option value="accessory">Accessories</option>
          <option value="bowl">Bowls</option>
          <option value="smoothie">Smoothies</option>
        </select>
      </label>
      <div id="products-list">
        {products.map((product) => (
          <AllProductsListItem product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
