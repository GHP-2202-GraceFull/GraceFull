import React from "react";

const AddCategory = () => {
  return (
    <div id="category-container">
      <h2>Add a New Product Category</h2>
      <form onSubmit={() => console.log("submit new category clicked")}>
        <label htmlFor="name">Category Name:</label>
        <input name="name" type="text" className="product-input"></input>
        <button type="submit" className="button">
          Add New Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
