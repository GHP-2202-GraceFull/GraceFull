import React from "react";
import AllProducts from "../AllProducts";

//TODO: replace console log with call to back end to create new product (line 17)
//TODO: replace hardcoded categories with a map through categories from database (to handle additional categories added by admin users, line 31)

const AdminProducts = () => {
  return (
    <div id="admin-products">
      <div id="all-products-admin">
        <AllProducts adminView={true} />
      </div>

      <div id="admin-product-options">
        <div id="new-product-container">
          <h2>Add a New Product</h2>
          <form
            id="new-product"
            onSubmit={() => console.log("submit new product clicked")}
          >
            <label htmlFor="name">Product Name:</label>
            <input name="name" type="text"></input>
            <label htmlFor="description">Description:</label>
            <input name="description" type="text"></input>
            <label htmlFor="price">Price:</label>
            <input name="price" type="number"></input>
            <label htmlFor="stock">Stock:</label>
            <input name="stock" type="number"></input>
            <label htmlFor="imageUrl">Image URL:</label>
            <input name="imageUrl" type="url"></input>
            <fieldset onChange={(event, value) => console.log(value)}>
              <legend>Categories:</legend>
              <div className="fieldset">
                <div>
                  <input name="bowl" type="checkbox" />
                  <label htmlFor="bowl">Bowl</label>
                </div>
                <div>
                  <input name="smoothie" type="checkbox" />
                  <label htmlFor="smoothie">Smoothie</label>
                </div>
                <div>
                  <input name="accessory" type="checkbox" />
                  <label htmlFor="accessory">Accessory</label>
                </div>
              </div>
            </fieldset>
            <button type="submit">Add New Product</button>
          </form>
        </div>
        <div id="category-container">
          <h2>Add a New Product Cateogry</h2>
          <form onSubmit={() => console.log("submit new category clicked")}>
            <label htmlFor="name">Category Name:</label>
            <input name="name" type="text"></input>
            <button type="submit">Add New Category</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
