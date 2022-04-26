import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  postCategory,
  deleteCategory,
} from "../../store/categories";
import { Chip } from "@material-ui/core";
import { AiOutlinePlusCircle } from "react-icons/ai";

const AddCategory = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  const categories = useSelector((state) => state.categories);
  const [input, editInput] = useState("");
  return (
    <div id="category-container">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          dispatch(postCategory({ name: input }));
          editInput("");
        }}
      >
        <div id="add-header">
          <h2>Add a New Category</h2>
          <button type="submit">
            <AiOutlinePlusCircle size={30} />
          </button>
        </div>
        <label htmlFor="name">Category Name:</label>
        <input
          name="name"
          type="text"
          className="product-input"
          value={input}
          onChange={(event) => editInput(event.target.value)}
        ></input>
      </form>
      <div id="category-chips">
        {categories.map((category) => (
          <Chip
            key={category.id}
            onDelete={() => dispatch(deleteCategory(category.id))}
            label={
              category.name.charAt(0).toUpperCase() + category.name.slice(1)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default AddCategory;
