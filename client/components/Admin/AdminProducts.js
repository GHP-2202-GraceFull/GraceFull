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
  const [productForm, toggleProductForm] = useState("addNew");
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

  const changeProductForm = (formState, productToEdit) => {
    toggleProductForm(formState);
    editProduct({
      title: productToEdit.title,
      description: productToEdit.description,
      imageUrl: productToEdit.imageUrl,
      stock: productToEdit.stock,
      price: productToEdit.price,
    });
    console.log(productToEdit.categories);
    const categoriesToEdit = productToEdit.categories.reduce(
      (arr, category) => {
        arr.push(category.name);
        return arr;
      },
      []
    );
    editCategories(categoriesToEdit);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (productForm === "addNew") {
      dispatch(addProduct(product, categories));
    } else if (productForm === "edit") {
      console.log("edit form send to backend");
      // dispatch(postProduct(product, categories))
    }
    editProduct(initialProduct);
    toggleProductForm("addNew");
  };

  const checkCategories = (value) => {
    console.log("inside check categories");
    if (categories.includes(value)) return true;
    return false;
  };
  console.log(categories, "categories");
  return (
    <div id="admin-products">
      <div id="all-products-admin">
        <AllProducts adminView={true} changeProductForm={changeProductForm} />
      </div>
      <div className="vl" />
      <div id="admin-product-options">
        <div id="new-product-container">
          <form id="new-product" onSubmit={handleSubmit}>
            <div id="add-header">
              <h2>
                {productForm === "addNew"
                  ? "Add a New Product"
                  : "Edit Product"}
              </h2>
              <button type="submit" className="invisible-button">
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
                    checked={checkCategories("bowl")}
                    onChange={handleCategoryChange}
                  />
                  <label htmlFor="bowl">Bowl</label>
                </div>
                <div>
                  <input
                    name="smoothie"
                    type="checkbox"
                    className="checkbox"
                    checked={checkCategories("smoothie")}
                    onChange={handleCategoryChange}
                  />
                  <label htmlFor="smoothie">Smoothie</label>
                </div>
                <div>
                  <input
                    name="accessory"
                    type="checkbox"
                    className="checkbox"
                    checked={checkCategories("accessory")}
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
