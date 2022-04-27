import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../store/allProducts";
import AddToCart from "./AddToCart";
import AllProductsListItem from "./AllProductsListItem";
import AllProductsAdminList from "./AllProductsAdminList";

const AllProducts = ({ adminView = false, changeProductForm }) => {
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("");
  const dispatch = useDispatch();
  let products = useSelector((state) => {
    return state.allProducts;
  });

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  if (sort === "lowHigh") {
    products.sort((a, b) => a.price - b.price);
  } else if (sort === "highLow") {
    products.sort((a, b) => b.price - a.price);
  } else if (sort === "") {
    products.sort((a, b) => b.id - a.id);
  }

  if (filter && filter !== "") {
    products = products.filter((product) => {
      const categoryNames = product.categories.map((category) => category.name);
      return categoryNames.includes(filter);
    });
  }

  return (
    <div>
      <div id="product-filters">
        <select
          name="sort"
          value={sort}
          onChange={(event) => {
            setSort(event.target.value);
          }}
        >
          <option value="">Price: No sort</option>
          <option value="lowHigh">Price: Low to High</option>
          <option value="highLow">Price: High to Low</option>
        </select>
        <select
          name="filter"
          value={filter}
          onChange={(event) => {
            setFilter(event.target.value);
          }}
        >
          <option value="">All Categories</option>
          <option value="accessory">Accessories</option>
          <option value="bowl">Bowls</option>
          <option value="smoothie">Smoothies</option>
        </select>
      </div>

      {adminView ? (
        products.map((product) => (
          <AllProductsAdminList
            product={product}
            key={product.id}
            changeProductForm={changeProductForm}
          />
        ))
      ) : (
        <div id="products-list">
          {products.map((product) => (
            <AllProductsListItem product={product} key={product.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
