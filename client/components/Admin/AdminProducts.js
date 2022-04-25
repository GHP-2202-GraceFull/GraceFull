import React from "react";
import AllProducts from "../AllProducts";

const AdminProducts = () => {
  return (
    <div id="admin-products">
      <div id="all-products-admin">
        <AllProducts adminView={true} />
      </div>

      <div id="admin-product-options">
        <form id="new-product">
          <label htmlFor="name">Product Name:</label>
          <input name="name"></input>
          <label htmlFor="stock">Stock:</label>
          <input name="stock" type="number"></input>
        </form>
        <button>Add New Product</button>
        <button>Add New Category</button>
      </div>
    </div>
  );
};

export default AdminProducts;
