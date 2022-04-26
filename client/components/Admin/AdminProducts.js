import React, { useState } from "react";
import AllProducts from "../AllProducts";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addProduct } from "../../store/allProducts";
import AddCategory from "./AddCategory";
//TODO: replace console log with call to back end to create new product (line 17)
//TODO: replace hardcoded categories with a map through categories from database (to handle additional categories added by admin users, line 31)

const AdminProducts = () => {
  const dispatch = useDispatch();

  const initialProduct = {
    title: "",
    description: "",
    imageUrl: "",
    stock: 0,
    price: 0,
  };

  const [product, editProduct] = useState(initialProduct);
  const [categories, editCategories] = useState([]);

  const handleFormChange = (event) => {
    editProduct({ ...product, [event.target.name]: event.target.value });
  };

  const handleCategoryChange = (event) => {
    if (event.target.checked) {
      editCategories([...categories, event.target.name]);
    } else {
      editCategories(
        categories.filter((category) => category !== event.target.name)
      );
    }
  };

  return (
    <div id="admin-products">
      <div id="all-products-admin">
        <AllProducts adminView={true} />
      </div>
      <div className="vl" />
      <div id="admin-product-options">
        <div id="new-product-container">
          <form
            id="new-product"
            onSubmit={(event) => {
              event.preventDefault();
              dispatch(addProduct(product, categories));
              editProduct(initialProduct);
            }}
          >
            <div id="add-header">
              <h2>Add a New Product</h2>
              <button type="submit">
                <AiOutlinePlusCircle size={30} />
              </button>
            </div>
            <label htmlFor="title">Product Name:</label>
            <input
              name="title"
              type="text"
              className="product-input"
              required
              value={product.title}
              onChange={handleFormChange}
            />
            <label htmlFor="description">Description:</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleFormChange}
            />
            <label htmlFor="imageUrl">Image URL:</label>
            <input
              name="imageUrl"
              type="url"
              className="product-input"
              required={false}
              value={product.imageUrl}
              onChange={handleFormChange}
            />
            <label htmlFor="price">Price:</label>
            <input
              name="price"
              type="number"
              min={0}
              className="product-input"
              value={product.price}
              onChange={handleFormChange}
            />

            <label htmlFor="stock">Stock:</label>
            <input
              name="stock"
              type="number"
              min={0}
              className="product-input"
              value={product.stock}
              onChange={handleFormChange}
            ></input>
            <fieldset>
              <legend>Categories:</legend>
              <div className="fieldset">
                <div>
                  <input
                    name="bowl"
                    type="checkbox"
                    className="checkbox"
                    onChange={handleCategoryChange}
                  />
                  <label htmlFor="bowl">Bowl</label>
                </div>
                <div>
                  <input
                    name="smoothie"
                    type="checkbox"
                    className="checkbox"
                    onChange={handleCategoryChange}
                  />
                  <label htmlFor="smoothie">Smoothie</label>
                </div>
                <div>
                  <input
                    name="accessory"
                    type="checkbox"
                    className="checkbox"
                    onChange={handleCategoryChange}
                  />
                  <label htmlFor="accessory">Accessory</label>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
        <AddCategory />
      </div>
    </div>
  );
};

export default AdminProducts;
